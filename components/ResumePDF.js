import React, { useState, useEffect } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 

const ResumePDF = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setResumeData(data[0]);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const generatePdf = async (resumeData) => {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595.28, 841.89]);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      let y = page.getHeight() - 50;
      const lineHeight = 18;
      const leftMargin = 50;
      const rightMargin = 50;
      const maxTextWidth = page.getWidth() - leftMargin - rightMargin;

      const drawText = (
        text,
        x,
        y,
        fontSize = 12,
        bold = false,
        maxWidth = maxTextWidth
      ) => {
        const selectedFont = bold ? boldFont : font;
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: selectedFont,
          maxWidth,
        });
      };

      const drawLine = (x1, y1, x2, y2) => {
        page.drawLine({
          start: { x: x1, y: y1 },
          end: { x: x2, y: y2 },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      };

      const splitTextIntoLines = (text, maxWidth, fontSize, font) => {
        if (!text) return [];
        const lines = [];
        let currentLine = "";
        let currentWidth = 0;
        const words = text.split(/\s+/);
        for (const word of words) {
          const wordWidth = font.widthOfTextAtSize(word, fontSize);
          if (currentWidth + wordWidth < maxWidth) {
            currentLine += (currentLine ? " " : "") + word;
            currentWidth +=
              wordWidth +
              (currentLine ? font.widthOfTextAtSize(" ", fontSize) : 0);
          } else {
            lines.push(currentLine.trim());
            currentLine = word;
            currentWidth = wordWidth;
          }
        }
        if (currentLine.trim() !== "") {
          lines.push(currentLine.trim());
        }
        return lines;
      };

      const checkAndAddNewPage = () => {
        if (y < 100) {
          page = pdfDoc.addPage([595.28, 841.89]);
          y = page.getHeight() - 50;
        }
      };

      // Drawing the name
      drawText(resumeData.name, leftMargin, y, 14, true);
      y -= lineHeight;

      // Contact Information

      drawText(`Phone: ${resumeData.contactNumber}`, leftMargin, y);
      y -= lineHeight;
      drawText(`Email: ${resumeData.email}`, leftMargin, y);
      y -= lineHeight;
      drawText(`LinkedIn: ${resumeData.linkedinURL}`, leftMargin, y);
      y -= lineHeight * 2;
      drawLine(
        leftMargin,
        y + lineHeight / 2,
        page.getWidth() - rightMargin,
        y + lineHeight / 2
      );
      y -= lineHeight * 2;

      // Education Section

      if (resumeData.education && resumeData.education.length > 0) {
        checkAndAddNewPage();
        drawText("Education", leftMargin, y, 14, true);
        y -= lineHeight * 1.5;

        resumeData.education.forEach((edu, index) => {
          const availableWidth = page.getWidth() - leftMargin - rightMargin;

          drawText(`${edu.degree}`, leftMargin, y, 12, true);
          drawText(`at ${edu.institution}`, leftMargin, y - lineHeight);

          const yearTextWidth = font.widthOfTextAtSize(`Year: ${edu.year}`, 12);
          drawText(
            `Year: ${edu.year}`,
            page.getWidth() - rightMargin - yearTextWidth,
            y,
            12
          );

          y -= lineHeight * 2;

          const descriptionLines = splitTextIntoLines(
            edu.description,
            availableWidth,
            12,
            font
          );
          descriptionLines.forEach((line) => {
            drawText(line, leftMargin, y);
            y -= lineHeight;
          });

          if (index !== resumeData.education.length - 1) {
            y -= lineHeight * 0.5;
          }
        });

        drawLine(
          leftMargin,
          y + lineHeight / 2,
          page.getWidth() - rightMargin,
          y + lineHeight / 2
        );
        y -= lineHeight * 2;
      }

      // Experience Section
      if (resumeData.experience && resumeData.experience.length > 0) {
        checkAndAddNewPage();
        drawText("Experience", leftMargin, y, 14, true);
        y -= lineHeight * 1.5;

        resumeData.experience.forEach((exp, index) => {
          const availableWidth = page.getWidth() - leftMargin - rightMargin;

          drawText(`${exp.role}`, leftMargin, y, 12, true);
          drawText(`at ${exp.company}`, leftMargin, y - lineHeight);

          const datesText = `From: ${new Date(
            exp.startDate
          ).toLocaleDateString()} To: ${
            exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"
          }`;
          const datesTextWidth = font.widthOfTextAtSize(datesText, 12);
          drawText(
            datesText,
            page.getWidth() - rightMargin - datesTextWidth,
            y,
            12
          );

          y -= lineHeight * 2;

          if (exp.location) {
            drawText(exp.location, leftMargin, y);
            y -= lineHeight;
          }

          // Draw the description
          const descriptionLines = splitTextIntoLines(
            exp.description,
            availableWidth,
            12,
            font
          );
          descriptionLines.forEach((line) => {
            drawText(line, leftMargin, y);
            y -= lineHeight;
          });

          if (index !== resumeData.experience.length - 1) {
            y -= lineHeight * 0.5;
          }
        });

        drawLine(
          leftMargin,
          y + lineHeight / 2,
          page.getWidth() - rightMargin,
          y + lineHeight / 2
        );
        y -= lineHeight * 2;
      }

      // Projects Section
      if (resumeData.projects && resumeData.projects.length > 0) {
        checkAndAddNewPage();
        drawText("Projects", leftMargin, y, 14, true);
        y -= lineHeight * 1.5;

        resumeData.projects.forEach((project) => {
          const description = project.description || "";

          const descriptionLines = splitTextIntoLines(
            description,
            page.getWidth() - 2 * leftMargin,
            12,
            font
          );
          const entrySpaceNeeded = lineHeight * (2 + descriptionLines.length);

          checkAndAddNewPage(entrySpaceNeeded);

          // Project Name
          drawText(`${project.name}`, leftMargin, y, 12, true);
          y -= lineHeight;

          descriptionLines.forEach((line) => {
            drawText(line, leftMargin, y);
            y -= lineHeight;
          });

          y -= lineHeight * 0.5;
        });

        drawLine(
          leftMargin,
          y + lineHeight / 2,
          page.getWidth() - rightMargin,
          y + lineHeight / 2
        );
        y -= lineHeight;
      }

      // Technical Skills Section
      if (resumeData.technicalSkills && resumeData.technicalSkills.length > 0) {
        checkAndAddNewPage();
        drawText("Technical Skills", leftMargin, y, 14, true);
        y -= lineHeight * 1.5;

        const skillsText = resumeData.technicalSkills.join(", ");

        const skillsLines = splitTextIntoLines(
          skillsText,
          page.getWidth() - 2 * leftMargin,
          12,
          font
        );

        skillsLines.forEach((line) => {
          drawText(line, leftMargin, y);
          y -= lineHeight;
        });

        y -= lineHeight * 0.5;

        drawLine(
          leftMargin,
          y + lineHeight / 2,
          page.getWidth() - rightMargin,
          y + lineHeight / 2
        );
        y -= lineHeight;
      }

      // Certificates Section
      if (resumeData.certificates && resumeData.certificates.length > 0) {
        checkAndAddNewPage();
        drawText("Certificates", leftMargin, y, 14, true);
        y -= lineHeight * 1.5;

        resumeData.certificates.forEach((cert) => {
          const descriptionLines = splitTextIntoLines(
            cert.description,
            page.getWidth() - 2 * leftMargin,
            12,
            font
          );
          const entrySpaceNeeded = lineHeight * (3 + descriptionLines.length);

          checkAndAddNewPage(entrySpaceNeeded);

          // Certificate Name
          drawText(`${cert.name}`, leftMargin, y, 12, true);
          y -= lineHeight;

          // Issuing Organization
          drawText(`Issued by: ${cert.issuer}`, leftMargin, y);
          y -= lineHeight;

          // Dates
          drawText(
            `Date: ${new Date(cert.date).toLocaleDateString()}`,
            leftMargin,
            y
          );
          y -= lineHeight;

          descriptionLines.forEach((line) => {
            drawText(line, leftMargin, y);
            y -= lineHeight;
          });

          y -= lineHeight * 0.5;
        });

        drawLine(
          leftMargin,
          y + lineHeight / 2,
          page.getWidth() - rightMargin,
          y + lineHeight / 2
        );
        y -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl mt-5">
          <h1 className="font-extrabold text-4xl text-blue-500 mt">
            Resume Download
          </h1>
          <p className="text-gray-700 mt-7">
            Click on the download button below to get your resume! 📥 Unlock new
            career opportunities with just one click. 🚀
          </p>
          <button
            className="blue_btn mt-3 font-bold"
            onClick={() => handleDownloadPdf()}
            disabled={loading || !resumeData}
          >
            {loading ? "Preparing Resume..." : "Download"}
          </button>
        </div>
      </div>
      <div className="mt-20"></div>
    </>
  );

  async function handleDownloadPdf() {
    if (resumeData) {
      await generatePdf(resumeData);
    }
  }
};

export default ResumePDF;
