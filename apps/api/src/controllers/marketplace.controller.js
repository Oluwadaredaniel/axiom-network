const prisma = require('../utils/prisma');

const registerCapability = async (req, res) => {
  try {
    const { name, description, category, pricePerCall, endpointUrl, providerId } = req.body;

    // Generate a simple slug from name
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const capability = await prisma.capability.create({
      data: {
        name,
        slug,
        description,
        category,
        pricePerCall,
        endpointUrl,
        providerId
      }
    });

    res.status(201).json(capability);
  } catch (error) {
    console.error('Register Capability Error:', error);
    res.status(500).json({ error: 'Failed to register capability' });
  }
};

const getAllCapabilities = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const capabilities = await prisma.capability.findMany({
      where: filter,
      include: {
        provider: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json(capabilities);
  } catch (error) {
    console.error('Get Capabilities Error:', error);
    res.status(500).json({ error: 'Failed to fetch capabilities' });
  }
};

const getCapabilityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const capability = await prisma.capability.findUnique({
      where: { slug },
      include: {
        provider: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!capability) {
      return res.status(404).json({ error: 'Capability not found' });
    }

    res.json(capability);
  } catch (error) {
    console.error('Get Capability Error:', error);
    res.status(500).json({ error: 'Failed to fetch capability' });
  }
};

module.exports = {
  registerCapability,
  getAllCapabilities,
  getCapabilityBySlug
};
