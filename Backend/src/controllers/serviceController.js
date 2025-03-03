const { admin, db } = require('../config/firebase');
const serviceRequestRef = db.ref('serviceRequests');

exports.createServiceRequest = async (req, res) => {
  try {
    const { userId, serviceProviderId, serviceType, description, location, requestedDate } = req.body;
    
    // Basic validation
    if (!userId || !serviceProviderId || !serviceType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Create a new service request
    const newRequestRef = serviceRequestRef.push();
    
    await newRequestRef.set({
      userId,
      serviceProviderId,
      serviceType,
      description,
      location,
      requestedDate,
      status: 'pending',
      createdAt: admin.database.ServerValue.TIMESTAMP
    });
    
    res.status(201).json({
      success: true,
      message: 'Service request created',
      requestId: newRequestRef.key
    });
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create service request'
    });
  }
};

exports.updateServiceRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    
    // Check if status is valid
    const validStatuses = ['pending', 'accepted', 'rejected', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    // Check if request exists
    const snapshot = await serviceRequestRef.child(requestId).once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }
    
    // Update status
    await serviceRequestRef.child(requestId).update({
      status,
      updatedAt: admin.database.ServerValue.TIMESTAMP
    });
    
    res.status(200).json({
      success: true,
      message: 'Service request updated'
    });
  } catch (error) {
    console.error('Error updating service request:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update service request'
    });
  }
};