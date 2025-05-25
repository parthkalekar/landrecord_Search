const { Op } = require("sequelize");
const LandRecord = require("../models/LandRecord.model");
const { generateReport } = require("../utils/PdfCreator");
const searchRecord = async (req, res) => {
    try {
        const { parcelId, plotNumber, ownerName, location } = req.query;
        let condition = {};
        if (parcelId) condition['parcel_id'] = parcelId;
        if (plotNumber) condition['plot_number'] = plotNumber;
        if (ownerName) condition['owner_name'] = { [Op.like]: `%${ownerName}%` };
        if (location) condition['location'] = { [Op.like]: `%${location}%` };

        const data = await LandRecord.findAll({ where: condition });

        if(!data){
            return res.status(400).json({ success: false, message: "No records found !" });
        }

        const pdfBuffer = await generateReport(data);
        if(!pdfBuffer){
            return res.status(400).json({ success: false, message: "Failed to generate Pdf !" });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=land_records.pdf");
        res.send(pdfBuffer);
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message || "Internal Server Error !" });
    }
};

module.exports = { searchRecord };