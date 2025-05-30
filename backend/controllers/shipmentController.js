const axios = require('axios');
const Shipment = require('../models/Shipment');
const User = require('../models/userModel');
const Address = require('../models/Address');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.calculateDistance = async (req, res) => {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination || 
        typeof origin.lat !== 'number' || typeof origin.lng !== 'number' ||
        typeof destination.lat !== 'number' || typeof destination.lng !== 'number') {
      return res.status(400).json({ 
        error: 'Invalid coordinates format',
        details: 'Expected { lat: number, lng: number } for both origin and destination'
      });
    }

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/directions/json',
      {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          key: GOOGLE_MAPS_API_KEY,
          units: 'metric'
        }
      }
    );

    if (response.data.status !== 'OK') {
      return res.status(400).json({ 
        error: 'Could not calculate route',
        status: response.data.status,
        message: response.data.error_message || 'No route could be found between the specified locations'
      });
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];

    const distanceInKm = leg.distance.value / 1000;
    const duration = leg.duration.text;

    res.json({ 
      distance: distanceInKm,
      duration: duration,
      polyline: route.overview_polyline.points
    });

  } catch (error) {
    console.error('Route calculation error:', error);
    res.status(500).json({ 
      error: 'Failed to calculate distance',
      details: error.message
    });
  }
};


const { v4: uuidv4 } = require('uuid');

exports.createShipment = async (req, res) => {
  try {
    const { userId,sender, receiver, vehicleType, distance, cost } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const trackingNumber = uuidv4().split('-')[0].toUpperCase();

    const newShipment = new Shipment({
      senderName: sender.name,
      senderPhone: sender.phone,
      senderEmail: sender.email || '',
      senderAddressLine1: sender.address.addressLine1,

      receiverName: receiver.name,
      receiverPhone: receiver.phone,
      receiverEmail: receiver.email || '',
      receiverAddressLine1: receiver.address.addressLine1,

      vehicleType,
      distance,
      cost,
      trackingNumber
    });

    const savedShipment = await newShipment.save();

    res.status(201).json({
      message: 'Shipment created successfully',
      trackingNumber: savedShipment.trackingNumber,
      shipment: savedShipment
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ message: 'Failed to create shipment' });
  }
};


