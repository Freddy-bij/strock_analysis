import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const seedAdmin = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
    const adminLastName = process.env.ADMIN_LAST_NAME || 'User';

    if (!adminEmail || !adminPassword) {
      console.log('⚠️  Admin credentials not found in environment variables. Skipping admin seeding.');
      return;
    }

    // Check if doctor already exists
    const existingDoctor = await User.findOne({ email: adminEmail });

    if (existingDoctor) {
      console.log('✅ Doctor user already exists:', adminEmail);
      return;
    }

    // Create doctor user
    const doctorUser = new User({
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      password: adminPassword,
      userType: 'doctor',
      specialization: 'Stroke Medicine',
      licenseNumber: 'MD-ADMIN-001',
      experience: 15,
      status: 'active',
      dateOfBirth: '1990-01-01',
      phone: '+250000000000'
    });

    await doctorUser.save();
    console.log('✅ Doctor user created successfully!');
    console.log('   Email:', adminEmail);
    console.log('   Name:', adminFirstName, adminLastName);
    console.log('   Role: doctor (Stroke Medicine)');
  } catch (error: any) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

export default seedAdmin;
