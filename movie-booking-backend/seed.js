const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const Show = require('./models/Show');
const Seat = require('./models/Seat');
const Snack = require('./models/Snack');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});
    await Seat.deleteMany({});
    await Snack.deleteMany({});
    console.log('Cleared existing movie booking collections.');

    // 1. Seed Movies with cast and Unsplash images
    const movies = await Movie.insertMany([
      {
        title: 'Spider-Man: Brand New Day',
        description: 'Peter Parker balances college struggles with web-slinging responsibilities in a fresh chapter of his superhero life.',
        genre: ['Action', 'Sci-Fi', 'Adventure'],
        language: 'English',
        duration: 135,
        posterUrl: '/posters/spiderman.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2026-05-01'),
        rating: 'UA',
        cast: ['Tom Holland', 'Zendaya', 'Jacob Batalon']
      },
      {
        title: 'Liger',
        description: 'An MMA fighter with a stuttering problem fights his way up through the ranks to achieve global glory.',
        genre: ['Action', 'Drama', 'Sport'],
        language: 'Telugu',
        duration: 140,
        posterUrl: '/posters/liger.jpg',
        trailerUrl: 'https://youtube.com/watch?v=KzJOmG2Gk1k',
        releaseDate: new Date('2022-08-25'),
        rating: 'UA',
        cast: ['Vijay Deverakonda', 'Ananya Panday', 'Mike Tyson']
      },
      {
        title: 'Aruguru Pativratalu',
        description: 'A classic Telugu drama exploring marital bonds, trust, and traditional social systems in household families.',
        genre: ['Drama', 'Comedy'],
        language: 'Telugu',
        duration: 125,
        posterUrl: '/posters/aruguru.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2004-03-01'),
        rating: 'A',
        cast: ['L.B. Sriram', 'Sarika', 'Ravi Babu']
      },
      {
        title: 'Avengers: Doomsday',
        description: 'The Avengers face their ultimate test as Victor von Doom brings total destruction to the multiverse.',
        genre: ['Action', 'Sci-Fi', 'Adventure'],
        language: 'English',
        duration: 160,
        posterUrl: '/posters/avengers.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2026-05-01'),
        rating: 'UA',
        cast: ['Robert Downey Jr.', 'Pedro Pascal', 'Vanessa Kirby']
      },
      {
        title: 'Jailer 2',
        description: 'Retired warden Tiger Muthuvel Pandian returns to protect his family and crush a new global crime syndicate.',
        genre: ['Action', 'Thriller', 'Crime'],
        language: 'Tamil',
        duration: 155,
        posterUrl: '/posters/jailer2.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2025-08-15'),
        rating: 'UA',
        cast: ['Rajinikanth', 'Mohanlal', 'Shiva Rajkumar']
      },
      {
        title: 'The Raja Saab',
        description: 'A romantic horror comedy showcasing a royal ghost, family curses, and hilarious hauntings in an ancient estate.',
        genre: ['Comedy', 'Horror', 'Romance'],
        language: 'Telugu',
        duration: 145,
        posterUrl: '/posters/rajasab.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2025-04-10'),
        rating: 'UA',
        cast: ['Prabhas', 'Malavika Mohanan', 'Nidhhi Agerwal']
      },
      {
        title: 'Brahmotsavam',
        description: 'A family-centric emotional journey emphasizing family values, family tree heritage, and tracing roots across India.',
        genre: ['Drama', 'Family'],
        language: 'Telugu',
        duration: 156,
        posterUrl: '/posters/brahmotsavam.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2016-05-20'),
        rating: 'U',
        cast: ['Mahesh Babu', 'Kajal Aggarwal', 'Samantha Ruth Prabhu']
      },
      {
        title: 'Theri (Tamil)',
        description: 'An honest police officer hides his identity to raise his daughter in peace, until past enemies hunt him down.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Tamil',
        duration: 158,
        posterUrl: '/posters/theri.jpg',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        releaseDate: new Date('2016-04-14'),
        rating: 'UA',
        cast: ['Vijay', 'Samantha Ruth Prabhu', 'Amy Jackson']
      },
      {
        title: 'Baahubali (All Languages)',
        description: 'A young orphan learns of his royal heritage and seeks to overthrow a tyrannical king in the kingdom of Mahishmati.',
        genre: ['Action', 'Drama', 'Fantasy'],
        language: 'Telugu, Tamil, Hindi',
        duration: 159,
        posterUrl: '/posters/bahubali.jpg',
        trailerUrl: 'https://youtube.com/watch?v=qD-6d8Wo3do',
        releaseDate: new Date('2015-07-10'),
        rating: 'UA',
        cast: ['Prabhas', 'Rana Daggubati', 'Anushka Shetty', 'Tamannaah Bhatia']
      }
    ]);
    console.log(`Seeded ${movies.length} Movies.`);

    // 2. Seed Shows dynamically for all movies (generating multiple shows if the movie has multiple languages)
    const showsData = [];
    movies.forEach((movie, index) => {
      const languagesList = movie.language.split(',').map((l) => l.trim());
      languagesList.forEach((lang, langIdx) => {
        showsData.push({
          movieId: movie._id,
          screenName: `Screen ${((index + langIdx) % 3) + 1}`,
          dateTime: new Date(Date.now() + (24 + index * 4 + langIdx * 2) * 60 * 60 * 1000),
          basePrice: 150 + ((index + langIdx) % 3) * 50,
          language: lang
        });
      });
    });

    const shows = await Show.insertMany(showsData);
    console.log(`Seeded ${shows.length} Showtimes dynamically.`);

    // 3. Generate Seat layouts for each show (40 seats per show)
    const seats = [];
    const rows = ['A', 'B', 'C', 'D'];
    
    for (const show of shows) {
      for (const row of rows) {
        for (let num = 1; num <= 10; num++) {
          const seatNumber = `${row}${num}`;
          const isPremium = row === 'D';
          seats.push({
            showId: show._id,
            seatNumber,
            category: isPremium ? 'Premium' : 'Standard',
            price: isPremium ? show.basePrice + 100 : show.basePrice,
            status: 'Available'
          });
        }
      }
    }

    await Seat.insertMany(seats);
    console.log(`Auto-generated ${seats.length} seats.`);

    // 4. Seed Concession Snacks
    await Snack.insertMany([
      {
        name: 'Samosa',
        description: 'Crispy pastry triangle filled with spicy mashed potato and peas. Served with spicy green mint chutney.',
        price: 80,
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        name: 'Pepsi',
        description: 'Chilled Pepsi carbonated soft drink served in a cup with ice.',
        price: 90,
        imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        name: 'Water Bottle',
        description: 'Pure packaged drinking mineral water served chilled.',
        price: 40,
        imageUrl: 'https://images.unsplash.com/photo-1560344005-020ff6180b53?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        name: 'Burger',
        description: 'Crispy veggie patty with creamy cheese, fresh onions, tomatoes, and spicy burger sauce.',
        price: 140,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      },
      {
        name: 'Pizza',
        description: 'Freshly baked cheese pizza topped with mozzarella and sliced green bell peppers.',
        price: 190,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        isAvailable: true
      }
    ]);
    console.log('Seeded Snacks menu.');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
