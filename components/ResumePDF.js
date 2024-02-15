import React, { useState, useCallback } from 'react';

import axios from "axios";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const generatePdf = async (resumeData) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    // Set up font (adjust font name and size if needed)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Render resume data on the PDF
    const drawText = (text, options) => {
      page.drawText(text, {
        x: options.x,
        y: options.y,
        size: options.size || 12,
        font: font,
        color: options.color || rgb(0, 0, 0),
      });
    };

    // Define initial y coordinate and line height
    let y = 750;
    const lineHeight = 15; // Decreased line spacing

    // Define positions for each section with formatting
    const sections = [
      { title: 'Personal Information', fields: [
        { label: 'Name:', value: resumeData.name },
        { label: 'LinkedIn:', value: resumeData.linkedinURL },
        { label: 'Phone:', value: resumeData.contactNumber },
        { label: 'Email:', value: resumeData.email },
      ]},
      { title: 'Projects', fields: [
        { value: resumeData.projects },
      ]},
      { title: 'Education', fields: [
        { value: resumeData.education },
      ]},
      { title: 'Experience', fields: [
        { value: resumeData.experience },
      ]},
      { title: 'Skills', fields: [
        { value: resumeData.technicalSkills.join(', ') },
      ]},
      // Add more sections if needed
    ];

    // Render each section with proper formatting
    sections.forEach(({ title, fields }) => {
      // Add section title
      const sectionTitleHeight = 20; // Height for section title
      if (y - sectionTitleHeight < 0) {
        page = pdfDoc.addPage(); // Add a new page if there's not enough space
        y = page.getHeight() - sectionTitleHeight; // Reset y coordinate
      }

      drawText(title, { x: 50, y, size: 14, color: rgb(0, 0, 0), bold: true });
      y -= lineHeight; // Move to the next line
      y -= lineHeight * 0.5; // Add some spacing after the section title

      // Render fields within the section
      fields.forEach(({ label, value }) => {
        let textX = 50;
        let textY = y;

        if (label) {
          drawText(`${label} `, { x: textX, y: textY, size: 12, color: rgb(0, 0, 0), bold: true });
          textX += font.widthOfTextAtSize(`${label} `, 12);
        }

        const availableWidth = page.getWidth() - textX - 50; // Adjusted for padding
        const lines = splitTextIntoLines(value, availableWidth, font);

        lines.forEach(line => {
          if (y - lineHeight < 0) {
            page = pdfDoc.addPage(); // Add a new page if there's not enough space
            y = page.getHeight(); // Reset y coordinate
          }
          drawText(line, { x: textX, y: textY, size: 12, color: rgb(0, 0, 0) });
          textY -= lineHeight;
        });

        // Move to the next line
        y = textY;
      });

      // Add spacing between sections
      y -= lineHeight * 2;
    });

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    link.click();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};


function splitTextIntoLines(text, maxWidth, font) {
  const lines = [];
  let currentLine = '';

  for (const char of text) {
    if (char === '\n') {
      lines.push(currentLine);
      currentLine = '';
    } else {
      const width = font.widthOfTextAtSize(currentLine + char, 12);
      if (width <= maxWidth || !currentLine) {
        currentLine += char;
      } else {
        lines.push(currentLine);
        currentLine = char;
      }
    }
  }
  if (currentLine !== '') {
    lines.push(currentLine);
  }

  return lines;
}



const ResumePDF = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/resume");
      setResumeData(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!resumeData) {
      await fetchResumeData();
    }
    if (resumeData) {
      generatePdf(resumeData);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6">
        <h1 className="text-2xl font-bold mb-4">
          {resumeData ? resumeData.name : "Your Name"}
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">LinkedIn:</span>{" "}
          {resumeData ? resumeData.linkedinURL : "LinkedIn URL"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Phone:</span>{" "}
          {resumeData ? resumeData.contactNumber : "Contact Number"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Email:</span>{" "}
          {resumeData ? resumeData.email : "Email Address"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Projects:</span>{" "}
          {resumeData ? resumeData.projects : "Projects"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Education:</span>{" "}
          {resumeData ? resumeData.education : "Education"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Experience:</span>{" "}
          {resumeData ? resumeData.experience : "Experience"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Skills:</span>{" "}
          {resumeData ? resumeData.technicalSkills.join(", ") : "Skills"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Extra Curricular Activities:</span>{" "}
          {resumeData
            ? resumeData.extracurricularActivities
            : "Extra Curricular Activities"}
        </p>
        <div className="text-center mt-8">
          <button
            onClick={handleDownloadPdf}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePDF;
