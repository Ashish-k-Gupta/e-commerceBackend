// import { AppDataSource } from "../config/data-source";
// import { User } from "../entities/userEntity";
// import { hashUtil } from "../utils/hash.util";

// const userRepo = AppDataSource.getRepository(User)

// export const seedAdminUser = async() =>{
//     const adminEmail = 'theashukumar007@gmail.com'
//     const existingAdmin = await userRepo.findOne({
//         where: {email: adminEmail}
//     })

//     if(!existingAdmin){
//         const adminUser = userRepo.create({
//             email: adminEmail,
//             password: await hashUtil.hash("Test@1234"),
//             firstName: 'Ashish',
//             lastName: 'Gupta',
//             phoneNumber: "7888436679",
//             role: "Admin"
//         })
//         await userRepo.save(adminUser)
//         console.log("Admin user seeded")
//     }else{
//         console.log('ℹ️ Admin user already exists');
//     }
// }
