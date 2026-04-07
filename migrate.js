const fs = require('fs');
const path = require('path');

const foldersToCreate = ['global', 'home', 'tours', 'vehicles', 'gear', 'backgrounds'];
const baseImageDir = path.join(__dirname, 'wp-content', 'IMAGES');

// 1. Create Directories
foldersToCreate.forEach(folder => {
  const dirPath = path.join(baseImageDir, folder);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// 2. The Great Dictionary 
const map = {
  // Global
  "wp-content/IMAGES/basswoods-logo.png": "wp-content/IMAGES/global/basswoods-logo.png",
  "wp-content/IMAGES/menu_campings.png": "wp-content/IMAGES/global/menu-campings.png",
  "wp-content/IMAGES/menu_vehicle_rentals.png": "wp-content/IMAGES/global/menu-vehicle-rentals.png",
  "wp-content/IMAGES/menu_camping_equipment.png": "wp-content/IMAGES/global/menu-camping-equipment.png",
  "wp-content/IMAGES/menu_tour_package.png": "wp-content/IMAGES/global/menu-tour-package.png",
  "wp-content/IMAGES/camp-1.jpg": "wp-content/IMAGES/global/camp-1.jpg",
  "wp-content/IMAGES/camp-2.jpg": "wp-content/IMAGES/global/camp-2.jpg",
  "wp-content/IMAGES/blue-sky-camp.jpg": "wp-content/IMAGES/global/blue-sky-camp.jpg",

  // Backgrounds
  "wp-content/IMAGES/vector-art/green forest.jpeg": "wp-content/IMAGES/backgrounds/green-forest.jpeg",
  "wp-content/IMAGES/vector art/green forest.jpeg": "wp-content/IMAGES/backgrounds/green-forest.jpeg",
  "wp-content/IMAGES/vector-art/MOUNTAIN AND MOON.jpeg": "wp-content/IMAGES/backgrounds/mountain-and-moon.jpeg",
  "wp-content/IMAGES/vector art/MOUNTAIN AND MOON.jpeg": "wp-content/IMAGES/backgrounds/mountain-and-moon.jpeg",
  "wp-content/IMAGES/vector-art/MOUNTAIN AND WATER.jpeg": "wp-content/IMAGES/backgrounds/mountain-and-water.jpeg",
  "wp-content/IMAGES/vector art/MOUNTAIN AND WATER.jpeg": "wp-content/IMAGES/backgrounds/mountain-and-water.jpeg",
  "wp-content/IMAGES/vector-art/green artistic.jpeg": "wp-content/IMAGES/backgrounds/green-artistic.jpeg",
  "wp-content/IMAGES/vector art/green artistic.jpeg": "wp-content/IMAGES/backgrounds/green-artistic.jpeg",
  "wp-content/IMAGES/vector-art/WhatsApp Image 2026-04-03 at 4.47.48 PM.jpeg": "wp-content/IMAGES/backgrounds/whatsapp-4-47.jpeg",
  "wp-content/IMAGES/vector-art/van.jpeg": "wp-content/IMAGES/backgrounds/van.jpeg",
  "wp-content/IMAGES/vector art/van.jpeg": "wp-content/IMAGES/backgrounds/van.jpeg",
  "wp-content/IMAGES/vector-art/road-biker.jpeg": "wp-content/IMAGES/backgrounds/road-biker.jpeg",
  "wp-content/IMAGES/vector art/road biker.jpeg": "wp-content/IMAGES/backgrounds/road-biker.jpeg",
  "wp-content/IMAGES/vector-art/WhatsApp Image 2026-04-03 at 4.55.10 PM (1).jpeg": "wp-content/IMAGES/backgrounds/whatsapp-4-55-1.jpeg",
  "wp-content/IMAGES/vector-art/WhatsApp Image 2026-04-03 at 4.55.10 PM.jpeg": "wp-content/IMAGES/backgrounds/whatsapp-4-55.jpeg",
  "wp-content/IMAGES/vector-art/RAINDEER.jpeg": "wp-content/IMAGES/backgrounds/raindeer.jpeg",
  "wp-content/IMAGES/camp night stars.jpeg": "wp-content/IMAGES/backgrounds/camp-night-stars.jpeg",
  "wp-content/IMAGES/blue sky camp.jpeg": "wp-content/IMAGES/backgrounds/blue-sky-camp.jpeg",

  // Tours
  "wp-content/IMAGES/ziro-festival.jpeg": "wp-content/IMAGES/tours/ziro-festival.jpeg",
  "wp-content/IMAGES/ziro festival.jpeg": "wp-content/IMAGES/tours/ziro-festival.jpeg", 
  "wp-content/IMAGES/green-scenary.jpeg": "wp-content/IMAGES/tours/green-scenery.jpeg",
  "wp-content/IMAGES/green scenary.jpeg": "wp-content/IMAGES/tours/green-scenery.jpeg",
  "wp-content/IMAGES/northeast-culture.jpeg": "wp-content/IMAGES/tours/northeast-culture.jpeg",
  "wp-content/IMAGES/northeast culture.jpeg": "wp-content/IMAGES/tours/northeast-culture.jpeg",
  "wp-content/IMAGES/arunachal.jpeg": "wp-content/IMAGES/tours/arunachal.jpeg",
  "assets/basswoods/arunachal.jpeg": "wp-content/IMAGES/tours/arunachal.jpeg",
  "wp-content/IMAGES/bonfire-lake.jpeg": "wp-content/IMAGES/tours/bonfire-lake.jpeg",
  "wp-content/IMAGES/nagaland.jpeg": "wp-content/IMAGES/tours/nagaland.jpeg",
  "assets/basswoods/nagaland.jpeg": "wp-content/IMAGES/tours/nagaland.jpeg",
  "assets/basswoods/mizoram.jpeg": "wp-content/IMAGES/tours/mizoram.jpeg",

  // Vehicles
  "wp-content/IMAGES/royal_enfield_himalayan.png": "wp-content/IMAGES/vehicles/royal-enfield-himalayan.png",
  "wp-content/IMAGES/suv_thar.png": "wp-content/IMAGES/vehicles/suv-thar.png",
  "wp-content/IMAGES/suv rent.jpeg": "wp-content/IMAGES/vehicles/suv-rent.jpeg",
  "wp-content/IMAGES/carvan rent.jpeg": "wp-content/IMAGES/vehicles/caravan-rent.jpeg",

  // Gear
  "wp-content/IMAGES/alpine pro tent.jpeg": "wp-content/IMAGES/gear/alpine-pro-tent.jpeg",
  "wp-content/IMAGES/lightweight sleeping bag.jpeg": "wp-content/IMAGES/gear/lightweight-sleeping-bag.jpeg",

  // Home Page / Insta Section
  "wp-content/IMAGES/insta photos/atv rental.jpeg": "wp-content/IMAGES/home/atv-rental.jpeg",
  "wp-content/IMAGES/insta photos/camping.jpeg": "wp-content/IMAGES/home/camping.jpeg",
  "wp-content/IMAGES/insta photos/car rental.jpeg": "wp-content/IMAGES/home/car-rental.jpeg",
  "wp-content/IMAGES/insta photos/dzokou.jpeg": "wp-content/IMAGES/home/dzokou.jpeg",
  "wp-content/IMAGES/insta photos/hornbil.jpeg": "wp-content/IMAGES/home/hornbil.jpeg"
};

// 3. Move Files physically if they exist
Object.keys(map).forEach(oldKey => {
  const oldLocalPath = path.join(__dirname, oldKey);
  const newLocalPath = path.join(__dirname, map[oldKey]);
  
  if (fs.existsSync(oldLocalPath) && !fs.existsSync(newLocalPath)) {
    fs.renameSync(oldLocalPath, newLocalPath);
    console.log(`Moved: ${oldKey} -> ${map[oldKey]}`);
  }
});

// 4. Update the Codebase
const codeDirs = [
  __dirname, 
  path.join(__dirname, 'assets', 'css'),
  path.join(__dirname, 'assets', 'js')
];

let filesProcessed = 0;

codeDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
        // Exclude backups and this script itself
        if (file.includes('corrupted') || file === 'migrate.js') return; 
        
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let fileChanged = false;
        
        // Loop over map to execute replaces. Sort by length descending to prevent partial matches.
        const sortedKeys = Object.keys(map).sort((a,b) => b.length - a.length);
        
        sortedKeys.forEach(oldKey => {
            // Also need to handle URL encodings in HTML for spaces
            const encodedKey = oldKey.replace(/ /g, '%20');
            
            if (content.includes(oldKey) || content.includes(encodedKey)) {
                // Global replace using split/join for safety on exact string matches
                content = content.split(oldKey).join(map[oldKey]);
                content = content.split(encodedKey).join(map[oldKey]);
                fileChanged = true;
            }
        });
        
        if (fileChanged) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated contents of: ${file}`);
            filesProcessed++;
        }
      }
    });
  }
});

console.log(`Migration complete. Files updated: ${filesProcessed}`);
