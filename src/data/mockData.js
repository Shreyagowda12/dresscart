// =========================================================
// DRESSCART - REALISTIC MOCK DATASET
// =========================================================

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Collection', icon: 'Sparkles', count: 24 },
  { id: 'women', name: "Women's Fashion", icon: 'Shirt', count: 12 },
  { id: 'men', name: "Men's Apparel", icon: 'UserCheck', count: 8 },
  { id: 'ethnic', name: 'Ethnic & Festive', icon: 'Flame', count: 6 },
  { id: 'western', name: 'Western & Chic', icon: 'Compass', count: 7 },
  { id: 'party', name: 'Party & Evening', icon: 'PartyPopper', count: 5 },
  { id: 'sale', name: 'Mega Sale %', icon: 'Percent', count: 9 },
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aurelia Floral Tiered Chiffon Maxi Dress',
    brand: 'Noir & Silk',
    category: 'women',
    tags: ['Bestseller', 'Trending'],
    price: 1899,
    originalPrice: 3499,
    discountPercent: 45,
    rating: 4.8,
    reviewsCount: 142,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Blush Rose', hex: '#f43f5e' },
      { name: 'Emerald Forest', hex: '#059669' },
      { name: 'Midnight Navy', hex: '#1e293b' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Drift through sunny afternoons and sunset garden parties in this dreamy floral tiered maxi dress. Crafted from lightweight, breathable crinkled chiffon with a delicate smocked bodice and flutter sleeves.',
    details: {
      fabric: '100% Georgette Chiffon with soft viscose lining',
      fit: 'Relaxed flared fit with elasticated smocked waist',
      neckline: 'V-neckline with tie-up tassel accents',
      care: 'Hand wash cold or gentle machine cycle. Line dry.',
      origin: 'Designed in Paris, Tailored in India'
    },
    reviews: [
      { id: 'r1', user: 'Ananya Sharma', rating: 5, date: '12 Sep 2026', title: 'Absolute head turner!', comment: 'The fabric flows so elegantly and the blush color looks even better in person. Fits true to size.' },
      { id: 'r2', user: 'Priya Mehta', rating: 4, date: '04 Sep 2026', title: 'Lovely dress', comment: 'Very comfortable for all-day wear. The lining is super soft.' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Royal Heritage Banarasi Silk Embellished Saree',
    brand: 'Varanasi Weaves',
    category: 'ethnic',
    tags: ['Hot Deal', 'Bestseller'],
    price: 3499,
    originalPrice: 7999,
    discountPercent: 56,
    rating: 4.9,
    reviewsCount: 230,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Royal Crimson', hex: '#991b1b' },
      { name: 'Peacock Teal', hex: '#0e7490' },
      { name: 'Mustard Gold', hex: '#d97706' }
    ],
    sizes: ['Free Size (5.5m + Blouse 0.8m)'],
    description: 'Immerse in timeless royal grandeur with our handcrafted Banarasi Katan silk saree. Features intricate antique zari brocade motifs and an opulent pallu perfect for weddings and festivities.',
    details: {
      fabric: 'Pure Katan Art Silk with Fine Metallic Zari',
      fit: 'Traditional 5.5 Meter Drape with Unstitched Blouse Piece',
      neckline: 'Customizable Blouse Fabric Included',
      care: 'Strictly dry clean only to preserve metallic zari lustre.',
      origin: 'Varanasi, India'
    },
    reviews: [
      { id: 'r3', user: 'Divya R.', rating: 5, date: '18 Aug 2026', title: 'Stunning craftsmanship', comment: 'Wore it to my brother wedding, got countless compliments! Looks like a 20k saree.' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Italian Tailored Slim-Fit Linen Blazer',
    brand: 'Sartoria Milano',
    category: 'men',
    tags: ['Trending'],
    price: 2999,
    originalPrice: 5999,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 95,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Sandy Beige', hex: '#d4b996' },
      { name: 'Slate Charcoal', hex: '#334155' },
      { name: 'Sky Chambray', hex: '#38bdf8' }
    ],
    sizes: ['38', '40', '42', '44'],
    description: 'A benchmark in smart-casual luxury. Breathable European linen blended with stretch fibers to give a sharp, crease-resistant tailored silhouette for summer sundowners and destination ceremonies.',
    details: {
      fabric: '70% European Flax Linen, 28% Cotton, 2% Elastane',
      fit: 'Modern Slim Fit with double back vents',
      neckline: 'Notch Lapel with hand-pick stitching',
      care: 'Professional dry clean only.',
      origin: 'Crafted with Italian-spun fibers'
    },
    reviews: [
      { id: 'r4', user: 'Rohan Kapoor', rating: 5, date: '01 Sep 2026', title: 'Perfect fit', comment: 'Tailoring is sharp. The beige shade looks ultra premium with white trousers.' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Velvet Midnight Starlight Cocktail Gown',
    brand: 'Atelier Luna',
    category: 'party',
    tags: ['Bestseller', 'New Arrival'],
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    rating: 4.9,
    reviewsCount: 88,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Midnight Noir', hex: '#0f172a' },
      { name: 'Deep Burgundy', hex: '#831843' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Captivate the room in plush micro-velvet adorned with subtle crystal constellation accents. Features a sultry thigh-high slit and structured sweetheart neckline with interior boning.',
    details: {
      fabric: 'Plush Stretch Silk Velvet with Satin Hem',
      fit: 'Bodycon contour fit with subtle train',
      neckline: 'Corset Sweetheart Neckline with Non-Slip Grip',
      care: 'Dry clean only.',
      origin: 'Milano, Italy'
    },
    reviews: [
      { id: 'r5', user: 'Natasha S.', rating: 5, date: '29 Aug 2026', title: 'Felt like a movie star!', comment: 'The velvet is so buttery soft and hugs every curve tastefully.' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Boho Sunset Embroidered Cotton Kurta Set',
    brand: 'Jaipur Threads',
    category: 'ethnic',
    tags: ['Hot Deal'],
    price: 1599,
    originalPrice: 3199,
    discountPercent: 50,
    rating: 4.6,
    reviewsCount: 164,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1583391733975-08182b8a2139?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Ochre Amber', hex: '#b45309' },
      { name: 'Pistachio Sage', hex: '#84cc16' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Pure 100% organic cotton straight kurta set featuring Kashmiri aari work embroidery on the yolk, paired with cropped palazzo pants and a sheer mulmul dupatta with gota patti borders.',
    details: {
      fabric: '100% Breathable Cambric Cotton',
      fit: 'Straight Relaxed Fit',
      neckline: 'Mandarin Keyhole Neck',
      care: 'Machine wash with like colors. Warm iron.',
      origin: 'Jaipur, Rajasthan'
    },
    reviews: [
      { id: 'r6', user: 'Shalini K.', rating: 4, date: '08 Sep 2026', title: 'Very breathable cotton', comment: 'Ideal for office and festive lunches. Embroidery is neat.' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Riviera Striped Linen Resort Casual Shirt',
    brand: 'Coast & Harbor',
    category: 'men',
    tags: ['Trending'],
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    rating: 4.5,
    reviewsCount: 77,
    stock: 19,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Navy & White Stripe', hex: '#1e3a8a' },
      { name: 'Olive Stripe', hex: '#3f6212' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Effortless coastal sophistication. Cut with a camp-collar Cuban neckline and crafted from ultra-soft washed linen cotton that keeps you cool under tropical sunshine.',
    details: {
      fabric: '55% Pure Linen, 45% Combed Cotton',
      fit: 'Comfort Boxy Fit with straight hem',
      neckline: 'Cuban Camp Collar',
      care: 'Machine wash cold, tumble dry low.',
      origin: 'Imported'
    },
    reviews: [
      { id: 'r7', user: 'Karan Joshi', rating: 5, date: '21 Aug 2026', title: 'Vacation ready', comment: 'Wore it on my Goa trip. Super light and breathable.' }
    ]
  },
  {
    id: 'prod-7',
    name: 'Satin Bias-Cut Slip Evening Midi Dress',
    brand: 'Maison Luxe',
    category: 'western',
    tags: ['Bestseller'],
    price: 1699,
    originalPrice: 3299,
    discountPercent: 48,
    rating: 4.8,
    reviewsCount: 112,
    stock: 11,
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#eab308' },
      { name: 'Ruby Wine', hex: '#9f1239' },
      { name: 'Gloss Obsidian', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'The epitome of 90s understated minimalism. Slinky heavyweight silk satin cut on the bias to drape effortlessly over natural contours. Features dainty adjustable spaghetti straps.',
    details: {
      fabric: 'Heavy Silk Touch Rayon-Satin Blend',
      fit: 'Fluid Bias Cut contour',
      neckline: 'Cowl Neckline with scoop back',
      care: 'Gentle hand wash inside out.',
      origin: 'Designed in London'
    },
    reviews: [
      { id: 'r8', user: 'Tanvi V.', rating: 5, date: '15 Sep 2026', title: 'Silky and gorgeous', comment: 'Drapes like a dream! Does not cling awkwardly.' }
    ]
  },
  {
    id: 'prod-8',
    name: 'Raw Denim Oversized Utility Trucker Jacket',
    brand: 'Urban Artisan',
    category: 'western',
    tags: ['New Arrival'],
    price: 2199,
    originalPrice: 4299,
    discountPercent: 49,
    rating: 4.7,
    reviewsCount: 65,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Vintage Indigo', hex: '#2563eb' },
      { name: 'Washed Ash', hex: '#475569' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Heavyweight 14oz ring-spun denim with authentic copper shank hardware, oversized drop shoulders, and 4 functional utility cargo pockets.',
    details: {
      fabric: '100% Sustainable Organic Cotton Denim',
      fit: 'Oversized Boxy Silhouette',
      neckline: 'Pointed Spread Collar',
      care: 'Wash inside out in cold water.',
      origin: 'Artisan Washed'
    },
    reviews: [
      { id: 'r9', user: 'Varun T.', rating: 5, date: '10 Sep 2026', title: 'Top tier denim', comment: 'Thick, rugged denim with that authentic vintage feel.' }
    ]
  },
  {
    id: 'prod-9',
    name: 'Embroidered Chikankari Georgette Anarkali Kurta',
    brand: 'Lucknowi heritage',
    category: 'ethnic',
    tags: ['Bestseller'],
    price: 2699,
    originalPrice: 5299,
    discountPercent: 49,
    rating: 4.9,
    reviewsCount: 198,
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Ivory Pearl', hex: '#f8fafc' },
      { name: 'Lilac Haze', hex: '#c084fc' },
      { name: 'Powder Blue', hex: '#60a5fa' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Exquisite hand-done Bakhiya and Phanda needlework by master craftswomen of Lucknow. Flowing 24-kali flared anarkali silhouette with matching inner slip.',
    details: {
      fabric: 'Airy Viscose Georgette with Cotton Inner Slip',
      fit: 'Flared 4-Meter Ghera Anarkali',
      neckline: 'Round with Button Placket',
      care: 'Dry clean recommended.',
      origin: 'Lucknow, Uttar Pradesh'
    },
    reviews: [
      { id: 'r10', user: 'Meera Rao', rating: 5, date: '02 Sep 2026', title: 'Pure poetry!', comment: 'The intricate hand embroidery is astounding. Worth every single rupee.' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Classic Double-Breasted Charcoal Tuxedo Suit',
    brand: 'Savile Row Guild',
    category: 'men',
    tags: ['New Arrival'],
    price: 5499,
    originalPrice: 11999,
    discountPercent: 54,
    rating: 4.8,
    reviewsCount: 42,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#111827' },
      { name: 'Royal Midnight', hex: '#172554' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    description: 'Black tie perfection. Tailored from super-120s wool blend with satin peak lapels, silk-covered buttons, and matching pleated trousers with satin side stripes.',
    details: {
      fabric: '75% Australian Merino Wool, 25% High-Tensile Poly',
      fit: 'Precision Tailored Fit',
      neckline: 'Satin Peak Lapel',
      care: 'Strictly dry clean.',
      origin: 'Imported Craftsmanship'
    },
    reviews: [
      { id: 'r11', user: 'Aditya Sen', rating: 5, date: '19 Aug 2026', title: 'Bond vibes', comment: 'Fits like bespoke tailored. Premium satin sheen on the lapels.' }
    ]
  },
  {
    id: 'prod-11',
    name: 'Bohemian Frill Hem Wrap Sundress',
    brand: 'Gypsy Bloom',
    category: 'women',
    tags: ['Hot Deal'],
    price: 1399,
    originalPrice: 2899,
    discountPercent: 51,
    rating: 4.6,
    reviewsCount: 89,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Tangerine Floral', hex: '#f97316' },
      { name: 'Cobalt Paisley', hex: '#2563eb' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'True wrap front silhouette that ties effortlessly at the waist. Feminine cascading ruffles along the hemline and sleeves give this dress dynamic, joyful movement.',
    details: {
      fabric: 'Eco-Vero Sustainable Viscose Rayon',
      fit: 'Adjustable Wrap Fit',
      neckline: 'Surplice V-Neckline',
      care: 'Cold gentle wash. Dry flat.',
      origin: 'Bali Inspired'
    },
    reviews: [
      { id: 'r12', user: 'Kavita N.', rating: 4, date: '11 Sep 2026', title: 'Super flattering', comment: 'The wrap style hugs the waist naturally. Perfect for summer brunches.' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Sequin Glitz High-Slit Mermaid Ball Gown',
    brand: 'Atelier Luna',
    category: 'party',
    tags: ['Trending'],
    price: 3899,
    originalPrice: 7999,
    discountPercent: 51,
    rating: 4.9,
    reviewsCount: 56,
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80'
    ],
    colors: [
      { name: 'Rose Gold Shimmer', hex: '#fb7185' },
      { name: 'Liquid Silver', hex: '#94a3b8' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Thousands of micro-light-catching metallic sequins embroidered onto flexible four-way stretch mesh. Features an alluring open back and dramatic fishtail train.',
    details: {
      fabric: 'Stretch Mesh with Micro Glass Sequins',
      fit: 'Sculpted Mermaid Silhouette',
      neckline: 'Plunging V-Neck with Sheer Illusion Panel',
      care: 'Spot clean or specialist dry clean only.',
      origin: 'Parisian Runways'
    },
    reviews: [
      { id: 'r13', user: 'Simran B.', rating: 5, date: '25 Aug 2026', title: 'Showstopper!', comment: 'Wore it for New Year gala. Everyone asked where I bought this from!' }
    ]
  }
];

export const MOCK_COUPONS = [
  {
    code: 'WELCOME10',
    title: 'First Order Special',
    discountPercent: 10,
    minOrder: 999,
    maxDiscount: 500,
    description: 'Get 10% OFF up to ₹500 on orders above ₹999'
  },
  {
    code: 'FESTIVE20',
    title: 'Festive Flash Promo',
    discountPercent: 20,
    minOrder: 1999,
    maxDiscount: 1000,
    description: 'Save 20% flat up to ₹1,000 on festive collections'
  },
  {
    code: 'FLAT500',
    title: 'Flat ₹500 Instant Discount',
    flatAmount: 500,
    minOrder: 2499,
    description: 'Flat ₹500 instant discount on orders above ₹2,499'
  },
  {
    code: 'FREESHIP',
    title: 'Free Express Shipping',
    freeShipping: true,
    minOrder: 499,
    description: 'Zero delivery fee on all orders above ₹499'
  }
];

export const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Jane Doe',
    type: 'Home',
    phone: '+91 98765 43210',
    addressLine1: 'Flat 402, High-Grove Residencies',
    addressLine2: 'Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Jane Doe',
    type: 'Office',
    phone: '+91 98765 43210',
    addressLine1: 'Tower B, Tech Innovation Park',
    addressLine2: 'Whitefield Main Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    isDefault: false
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'DC-892401',
    date: '14 Sep 2026',
    status: 'Delivered',
    trackingNumber: 'BLUEDART-84920491',
    carrier: 'BlueDart Express',
    estimatedDelivery: '17 Sep 2026',
    paymentMethod: 'UPI (Google Pay)',
    address: INITIAL_ADDRESSES[0],
    subtotal: 3499,
    discount: 500,
    deliveryFee: 0,
    total: 2999,
    timeline: [
      { step: 'Order Placed', time: '14 Sep, 10:30 AM', done: true },
      { step: 'Order Confirmed', time: '14 Sep, 11:15 AM', done: true },
      { step: 'Packed & Dispatched', time: '15 Sep, 02:40 PM', done: true },
      { step: 'In Transit', time: '16 Sep, 08:20 AM', done: true },
      { step: 'Out for Delivery', time: '17 Sep, 09:10 AM', done: true },
      { step: 'Delivered', time: '17 Sep, 01:45 PM', done: true }
    ],
    items: [
      {
        id: 'prod-2',
        name: 'Royal Heritage Banarasi Silk Embellished Saree',
        brand: 'Varanasi Weaves',
        price: 3499,
        quantity: 1,
        selectedSize: 'Free Size',
        selectedColor: 'Royal Crimson',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
      }
    ]
  },
  {
    id: 'DC-918230',
    date: '19 Sep 2026',
    status: 'In Transit',
    trackingNumber: 'FEDEX-99214412',
    carrier: 'FedEx Priority',
    estimatedDelivery: '22 Sep 2026',
    paymentMethod: 'Credit Card (HDFC Visa)',
    address: INITIAL_ADDRESSES[0],
    subtotal: 3198,
    discount: 320,
    deliveryFee: 0,
    total: 2878,
    timeline: [
      { step: 'Order Placed', time: '19 Sep, 03:20 PM', done: true },
      { step: 'Order Confirmed', time: '19 Sep, 03:45 PM', done: true },
      { step: 'Packed & Dispatched', time: '20 Sep, 09:00 AM', done: true },
      { step: 'In Transit', time: '20 Sep, 06:15 PM', done: true },
      { step: 'Out for Delivery', time: 'Estimated 22 Sep', done: false },
      { step: 'Delivered', time: 'Estimated 22 Sep', done: false }
    ],
    items: [
      {
        id: 'prod-1',
        name: 'Aurelia Floral Tiered Chiffon Maxi Dress',
        brand: 'Noir & Silk',
        price: 1899,
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Blush Rose',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'prod-6',
        name: 'Riviera Striped Linen Resort Casual Shirt',
        brand: 'Coast & Harbor',
        price: 1299,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Navy & White Stripe',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'
      }
    ]
  }
];

export const INITIAL_RETURNS = [
  {
    id: 'RET-4421',
    orderId: 'DC-892401',
    itemId: 'prod-2',
    itemName: 'Royal Heritage Banarasi Silk Embellished Saree',
    itemImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    reason: 'Color slightly different than phone screen',
    refundAmount: 2999,
    refundMethod: 'DressCart Wallet (+5% bonus)',
    requestDate: '18 Sep 2026',
    pickupScheduled: '21 Sep 2026 (10 AM - 1 PM)',
    status: 'Pickup Scheduled', // Requested | Pickup Scheduled | Quality Inspection | Refund Credited
    timeline: [
      { label: 'Return Requested', date: '18 Sep, 4:00 PM', done: true },
      { label: 'Pickup Scheduled', date: '21 Sep, 10:00 AM', done: true },
      { label: 'Quality Check', date: 'Pending Doorstep Pickup', done: false },
      { label: 'Refund Credited', date: 'Pending Inspection', done: false }
    ]
  }
];
