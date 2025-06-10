const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1500&h=800&fit=crop',
        filename: 'hero.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&h=200&fit=crop',
        filename: 'paris.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
        filename: 'tokyo.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=300&h=200&fit=crop',
        filename: 'machu-picchu.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop',
        filename: 'bali.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop',
        filename: 'santorini.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=300&h=200&fit=crop',
        filename: 'new-york.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=200&fit=crop',
        filename: 'barcelona.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=300&h=200&fit=crop',
        filename: 'sydney.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop',
        filename: 'dubai.jpg'
    }
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }

            const filePath = path.join(__dirname, 'images', filename);
            const fileStream = fs.createWriteStream(filePath);

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const downloadAllImages = async () => {
    try {
        for (const image of images) {
            await downloadImage(image.url, image.filename);
        }
        console.log('All images downloaded successfully!');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
};

downloadAllImages(); 