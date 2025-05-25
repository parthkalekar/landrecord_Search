const { DataTypes } = require('sequelize');
const sequelize = require('../config/DBConfig');

const LandRecord = sequelize.define("LandRecord", {
    parcel_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    plot_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.TEXT,
    },
    area: {
        type: DataTypes.STRING,
    },
    registration_date: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'land_records',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = LandRecord;