const puppeteer = require("puppeteer");
let browser;

const generateReport = async (landRecords = []) => {
    try {
        if (!browser) {
            browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
        }
        const page = await browser.newPage();
        let rows = '';
        landRecords?.forEach((row) => {
            rows += ` 
             <tr><td>${row?.parcel_id}</td>
        <td>${row?.plot_number}</td>
        <td>${row?.owner_name}</td>
        <td>${row?.location}</td>
        <td>${row?.area}</td>
        <td>${row?.registration_date ? new Date(row?.registration_date).toLocaleDateString() : "-"}</td>
        <td>${row?.created_at ? new Date(row?.registration_date).toLocaleDateString() : "-"}</td></tr>
            `;
        });

        const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Land Records</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      background-color: #f4f6f9;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
      font-size: 15px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px 12px;
      text-align: left;
    }
    th {
      background-color: #e9ecef;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    @media print {
      body {
        padding: 0;
        background: none;
      }
    }
  </style>
</head>
<body>

  <h1>Land Parcel Records</h1>

  <table>
    <thead>
      <tr>
        <th>Parcel ID</th>
        <th>Plot Number</th>
        <th>Owner Name</th>
        <th>Location</th>
        <th>Area</th>
        <th>Registration Date</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <!-- Add more rows here -->
    </tbody>
  </table>

</body>
</html>
`;
        const fileName = 'land_report';
        await page.setContent(htmlTemplate, { waitUntil: "domcontentloaded" });
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "10mm",
                right: "10mm"
            }
        });
        await page.close(); // after saving the PDF
        return pdfBuffer;

    } catch (error) {
        return null;
    }
};

module.exports = { generateReport };