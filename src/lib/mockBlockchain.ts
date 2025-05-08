// src/lib/mockBlockchain.ts

export interface HistoryEntry {
  owner: string;
  date: string;
  /** optional chain transaction identifier */
  transactionId?: string;
  /** type of this event */
  transactionType?: 'Initial Registration' | 'Transfer' | 'Inspection' | 'Certification';
  /** price in USD for sale or transfer */
  price?: number;
  /** any free-form notes */
  notes?: string;
}

export interface SupplierContact {
  address: string;
  website?: string;
  phone?: string;
  email?: string;
}

export interface CertificationDetail {
  name: string;
  certId: string;
  date: string;       // ISO date
  authority: string;
  documentUrl?: string;
}

export interface ComponentTrace {
  id: string;
  name: string;
  supplier: string;
  supplierContact?: SupplierContact;
  origin: string;
  coordinates?: { lat: number; lng: number };
  batchNumber: string;
  certifications: string[];
  certificationDetails?: CertificationDetail[];
  materialType?: 'Metal' | 'Leather' | 'Crystal' | 'Textile' | 'Electronics';
  weightGrams?: number;
}

export interface Asset {
  itemId: string;
  brand: string;
  model: string;
  owner: string;
  history: HistoryEntry[];
  components?: ComponentTrace[];
}

// Enriched sample assets
export const SAMPLE_ASSETS: Asset[] = [
  {
    itemId: 'ITEM001',
    brand: 'Rolex',
    model: 'Submariner',
    owner: 'Bob',
    history: [
      {
        owner: 'Alice',
        date: '2025-03-01T10:00:00Z',
        transactionId: 'TX10001',
        transactionType: 'Initial Registration',
        price: 9500,
        notes: 'Sold via official boutique'
      },
      {
        owner: 'Bob',
        date: '2025-04-10T11:30:00Z',
        transactionId: 'TX10045',
        transactionType: 'Transfer',
        price: 10200,
        notes: 'Private sale, includes box & papers'
      }
    ],
    components: [
      {
        id: 'C001',
        name: 'Sapphire Crystal',
        supplier: 'Schott AG',
        supplierContact: {
          address: 'Am Großmarkt 11, 28197 Bremen, Germany',
          website: 'https://www.schott.com',
          phone: '+49 421 3690 0'
        },
        origin: 'Germany',
        coordinates: { lat: 53.0793, lng: 8.8017 },
        batchNumber: 'S12345',
        certifications: ['ISO 12870'],
        certificationDetails: [
          {
            name: 'ISO 12870',
            certId: 'ISO-12870-2024-ROLEX',
            date: '2024-11-15',
            authority: 'International Organization for Standardization',
            documentUrl: 'https://iso.org/iso-12870-2024.pdf'
          }
        ],
        materialType: 'Crystal',
        weightGrams: 5
      },
      {
        id: 'C002',
        name: 'Oystersteel',
        supplier: 'ThyssenKrupp',
        supplierContact: {
          address: 'ThyssenKrupp Allee 1, 45143 Essen, Germany',
          website: 'https://www.thyssenkrupp.com',
          email: 'info@thyssenkrupp.com'
        },
        origin: 'Germany',
        coordinates: { lat: 51.4556, lng: 7.0116 },
        batchNumber: 'O98765',
        certifications: ['Fair Trade Certified'],
        certificationDetails: [
          {
            name: 'Fair Trade Certified',
            certId: 'FTC-56789',
            date: '2024-07-30',
            authority: 'Fair Trade International'
          }
        ],
        materialType: 'Metal',
        weightGrams: 120
      },
      {
        id: 'C003',
        name: 'Cerachrom Bezel',
        supplier: 'Rolex SA (Manufacture)',
        supplierContact: {
          address: 'Rue François-Dussaud 3-5, 1211 Genève, Switzerland',
          website: 'https://www.rolex.com'
        },
        origin: 'Switzerland',
        coordinates: { lat: 46.2140, lng: 6.1425 },
        batchNumber: 'C54321',
        certifications: ['In-house Certified'],
        certificationDetails: [
          {
            name: 'In-house Certified',
            certId: 'ROLEX-CERACHROM-2025',
            date: '2025-01-10',
            authority: 'Rolex Technical Division'
          }
        ],
        materialType: 'Metal',
        weightGrams: 15
      }
    ]
  },
  {
    itemId: 'ITEM002',
    brand: 'Hermès',
    model: 'Birkin 30',
    owner: 'Dave',
    history: [
      {
        owner: 'Carol',
        date: '2025-02-15T09:20:00Z',
        transactionId: 'TX20012',
        transactionType: 'Initial Registration',
        price: 12000,
        notes: 'Purchased at Paris flagship'
      },
      {
        owner: 'Dave',
        date: '2025-03-22T14:45:00Z',
        transactionId: 'TX20058',
        transactionType: 'Transfer',
        price: 12800
      }
    ],
    components: [
      {
        id: 'C004',
        name: 'Togo Leather',
        supplier: 'Tanneries Haas',
        supplierContact: {
          address: '3 Rue de Genève, 68125 Habsheim, France',
          website: 'https://www.haas-leder.de'
        },
        origin: 'France',
        coordinates: { lat: 47.7589, lng: 7.3575 },
        batchNumber: 'T22334',
        certifications: ['Leather Working Group (LWG) Gold'],
        certificationDetails: [
          {
            name: 'LWG Gold Rated',
            certId: 'LWG-GOLD-9988',
            date: '2024-09-12',
            authority: 'Leather Working Group'
          }
        ],
        materialType: 'Leather',
        weightGrams: 450
      },
      {
        id: 'C005',
        name: 'Gold Hardware',
        supplier: 'Metalor',
        supplierContact: {
          address: 'Route de Trélex 5, 1185 Genève, Switzerland',
          website: 'https://www.metalor.com'
        },
        origin: 'Switzerland',
        coordinates: { lat: 46.2991, lng: 6.1740 },
        batchNumber: 'G88321',
        certifications: ['Responsible Jewellery Council (RJC)'],
        certificationDetails: [
          {
            name: 'RJC Certified',
            certId: 'RJC-2024-5670',
            date: '2024-08-05',
            authority: 'Responsible Jewellery Council'
          }
        ],
        materialType: 'Metal',
        weightGrams: 30
      }
    ]
  },
  {
    itemId: 'ITEM003',
    brand: 'Louis Vuitton',
    model: 'Neverfull MM',
    owner: 'Emma',
    history: [
      {
        owner: 'Emma',
        date: '2025-01-05T15:30:00Z',
        transactionId: 'TX30005',
        transactionType: 'Initial Registration',
        price: 1700,
        notes: 'Online order via LV website'
      }
    ],
    components: [
      {
        id: 'C006',
        name: 'Monogram Canvas',
        supplier: 'Louis Vuitton Workshops',
        supplierContact: {
          address: '2 Rue du Pont-Neuf, 75001 Paris, France',
          website: 'https://us.louisvuitton.com',
          phone: '+33 1 40 20 20 20'
        },
        origin: 'France',
        coordinates: { lat: 48.8566, lng: 2.3522 },
        batchNumber: 'M99887',
        certifications: ['In-house Verified'],
        certificationDetails: [
          {
            name: 'In-house Verified',
            certId: 'LV-CANVAS-4444',
            date: '2024-10-20',
            authority: 'Louis Vuitton Quality Control',
            documentUrl: 'https://lv.com/certificates/M99887.pdf'
          }
        ],
        materialType: 'Textile',
        weightGrams: 200
      },
      {
        id: 'C007',
        name: 'Leather Trim',
        supplier: 'Gruppo Mastrotto',
        supplierContact: {
          address: 'Via Argine 95, 36100 Vicenza, Italy',
          website: 'https://www.mastrotto.com',
          email: 'info@mastrotto.com'
        },
        origin: 'Italy',
        coordinates: { lat: 45.5454, lng: 11.5352 },
        batchNumber: 'L55678',
        certifications: ['LWG Gold Rated'],
        certificationDetails: [
          {
            name: 'LWG Gold Rated',
            certId: 'LWG-GOLD-2233',
            date: '2024-11-02',
            authority: 'Leather Working Group'
          }
        ],
        materialType: 'Leather',
        weightGrams: 100
      }
    ]
  },
  {
    itemId: 'ITEM004',
    brand: 'Patek Philippe',
    model: 'Nautilus',
    owner: 'Frank',
    history: [
      {
        owner: 'Frank',
        date: '2025-02-18T13:15:00Z',
        transactionId: 'TX40022',
        transactionType: 'Initial Registration',
        price: 30000,
        notes: 'Acquired at Geneva Salon'
      }
    ],
    components: [
      {
        id: 'C008',
        name: 'White Gold Case',
        supplier: 'Metalor',
        supplierContact: {
          address: 'Route de Trélex 5, 1185 Genève, Switzerland',
          website: 'https://www.metalor.com'
        },
        origin: 'Switzerland',
        coordinates: { lat: 46.2991, lng: 6.1740 },
        batchNumber: 'WG34567',
        certifications: ['Responsible Jewellery Council (RJC)'],
        certificationDetails: [
          {
            name: 'RJC Certified',
            certId: 'RJC-2024-5681',
            date: '2024-10-30',
            authority: 'Responsible Jewellery Council'
          }
        ],
        materialType: 'Metal',
        weightGrams: 80
      },
      {
        id: 'C009',
        name: 'Sapphire Crystal',
        supplier: 'Stettler Sapphire',
        supplierContact: {
          address: 'Schaffhauserstrasse 4, 8180 Bülach, Switzerland',
          website: 'https://www.stettler-sapphire.com'
        },
        origin: 'Switzerland',
        coordinates: { lat: 47.5031, lng: 8.5478 },
        batchNumber: 'SC78901',
        certifications: ['GIA Report'],
        certificationDetails: [
          {
            name: 'GIA Report',
            certId: 'GIA-NAUT-1122',
            date: '2024-12-12',
            authority: 'Gemological Institute of America',
            documentUrl: 'https://gia.edu/report/NAUT-1122'
          }
        ],
        materialType: 'Crystal',
        weightGrams: 4
      }
    ]
  },
  {
    itemId: 'ITEM005',
    brand: 'Chanel',
    model: 'Classic Flap Bag',
    owner: 'Grace',
    history: [
      {
        owner: 'Grace',
        date: '2025-03-10T11:45:00Z',
        transactionId: 'TX50010',
        transactionType: 'Initial Registration',
        price: 8500,
        notes: 'Purchased at Chanel boutique, Tokyo'
      }
    ],
    components: [
      {
        id: 'C010',
        name: 'Lambskin Leather',
        supplier: 'Richard Heller Leder',
        supplierContact: {
          address: 'Rathausstrasse 25, 8302 Kloten, Switzerland',
          website: 'https://www.hellerleder.ch',
          email: 'contact@hellerleder.ch'
        },
        origin: 'Switzerland',
        coordinates: { lat: 47.4580, lng: 8.5976 },
        batchNumber: 'L65432',
        certifications: ['LWG Silver Rated'],
        certificationDetails: [
          {
            name: 'LWG Silver Rated',
            certId: 'LWG-SILVER-6677',
            date: '2024-09-18',
            authority: 'Leather Working Group'
          }
        ],
        materialType: 'Leather',
        weightGrams: 300
      },
      {
        id: 'C011',
        name: 'Gold-Tone Metal',
        supplier: 'Galvanica Formelli',
        supplierContact: {
          address: 'Via C. Mariaucci 14, 36050 Pojana Maggiore, Italy',
          website: 'https://www.formelli.it',
          phone: '+39 0444 123456'
        },
        origin: 'Italy',
        coordinates: { lat: 45.4136, lng: 11.5875 },
        batchNumber: 'G11223',
        certifications: ['Fair Trade Gold'],
        certificationDetails: [
          {
            name: 'Fair Trade Gold',
            certId: 'FTG-3344',
            date: '2024-08-22',
            authority: 'Fairtrade International'
          }
        ],
        materialType: 'Metal',
        weightGrams: 25
      }
    ]
  }
];

// In-memory assets storage
export let assets: Asset[] = [...SAMPLE_ASSETS];

// Register a new asset
export async function registerAsset(
  itemId: string,
  brand: string,
  model: string,
  owner: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  if (assets.some(a => a.itemId === itemId)) {
    return { success: false, error: 'Asset with this ID already exists' };
  }
  const newAsset: Asset = {
    itemId,
    brand,
    model,
    owner,
    history: [{ owner, date: new Date().toISOString() }],
    components: []
  };
  assets.push(newAsset);
  await new Promise(r => setTimeout(r, 500));
  return { success: true, asset: newAsset };
}

// Transfer asset ownership
export async function transferAsset(
  itemId: string,
  newOwner: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  const idx = assets.findIndex(a => a.itemId === itemId);
  if (idx === -1) return { success: false, error: 'Asset not found' };
  const asset = { ...assets[idx] };
  asset.history.push({ owner: newOwner, date: new Date().toISOString() });
  asset.owner = newOwner;
  assets[idx] = asset;
  await new Promise(r => setTimeout(r, 500));
  return { success: true, asset };
}

// Query asset details
export async function queryAsset(
  itemId: string
): Promise<{ success: boolean; asset?: Asset; error?: string }> {
  const asset = assets.find(a => a.itemId === itemId);
  await new Promise(r => setTimeout(r, 500));
  return asset
    ? { success: true, asset }
    : { success: false, error: 'Asset not found' };
}

// Generate ZKP proof (simulated)
export async function generateZKP(
  itemId: string,
  salt: string
): Promise<{ success: boolean; proofHash?: string; error?: string }> {
  const asset = assets.find(a => a.itemId === itemId);
  if (!asset) return { success: false, error: 'Asset not found' };
  await new Promise(r => setTimeout(r, 800));
  return { success: true, proofHash: 'SampleProof123ABC' };
}

// Verify identity (simulated)
export async function verifyIdentity(
  identity: string
): Promise<{ success: boolean; verifiedBy?: string[]; error?: string }> {
  if (!identity.trim()) {
    return { success: false, error: 'Identity cannot be empty' };
  }
  await new Promise(r => setTimeout(r, 800));
  return { success: true, verifiedBy: ['CA-Node-1', 'CA-Node-2'] };
}

// Reset data for testing
export function resetData(): void {
  assets = [...SAMPLE_ASSETS];
}

// Get all assets
export async function getAllAssets(): Promise<Asset[]> {
  await new Promise(r => setTimeout(r, 300));
  return assets;
}

// Get asset components
export async function getAssetComponents(
  itemId: string
): Promise<{ success: boolean; components?: ComponentTrace[]; error?: string }> {
  const asset = assets.find(a => a.itemId === itemId);
  await new Promise(r => setTimeout(r, 300));
  if (!asset) return { success: false, error: 'Asset not found' };
  return { success: true, components: asset.components || [] };
}
