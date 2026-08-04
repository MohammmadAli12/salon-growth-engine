// Marketplace catalog — data ported verbatim from the provided SalonGrow design.

export type Tier = {
  label: string;
  badge: string;
  badgeText: string;
  price: string;
  period: string;
  features: string[];
};

export type Service = {
  id: string;
  cat: string;
  name: string;
  desc: string;
  tiers: Tier[];
};

export type Bundle = { id: string; name: string; services: string[]; discount: number };

export const ICONS: Record<string, string> =  {
  website:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z"/></svg>',
  'local-seo':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>',
  'google-profile':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>',
  'seo-on-profile':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L12 16.7l-5.3 2.9 1.1-5.9-4.3-4.1 5.9-.7L12 3.5Z"/></svg>',
  'seo-off-profile':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14l4-4"/><path d="M8.3 16 6 18.3a3.1 3.1 0 0 1-4.4-4.4L4 11.6"/><path d="M16 8l2.3-2.3a3.1 3.1 0 0 1 4.4 4.4L20.4 12.4"/></svg>',
  'insta-ads':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7l1.4-2.3A1.8 1.8 0 0 1 10.9 4h2.2c.6 0 1.2.3 1.5.8L16 7"/><circle cx="12" cy="13.5" r="3.4"/></svg>',
  'google-ads':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1.3-3A7.9 7.9 0 0 1 4 12Z"/><circle cx="9" cy="12" r=".8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>'
};

export const HEART_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5s-7.6-4.7-9.7-9.3C.9 7.8 3 4.5 6.6 4.5c2 0 3.6 1.1 4.5 2.7.9-1.6 2.5-2.7 4.5-2.7 3.5 0 5.6 3.3 4.1 6.7C19.6 15.8 12 20.5 12 20.5Z"/></svg>';
export const BAG_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12.5H5L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>';

export const CAT_META: Record<string, { color: string; soft: string }> =  {
  web:{color:'#2C6E6E', soft:'#E4F0EF'},
  seo:{color:'#1E5940', soft:'#E4EFE7'},
  ads:{color:'#B15A3E', soft:'#F5E7E0'},
  social:{color:'#7A3B5E', soft:'#F1E3EC'},
  whatsapp:{color:'#9A7B1E', soft:'#F3ECD8'}
};

export const SERVICES: Service[] =  [
  { id:'website', cat:'web', name:'Build A Website',
    desc:'Professional salon website with templates & booking',
    tiers:[
      { label:'Starter', badge:'#E4F0EF', badgeText:'#2C6E6E', price:'₹5,000', period:'one-time',
        features:['1 Page Website','5 Ready Templates','Mobile Responsive','Basic Contact Form'] },
      { label:'Growth', badge:'#2C6E6E', badgeText:'#fff', price:'₹10,000', period:'one-time',
        features:['3 Page Website','5 Premium Templates','Gallery Section','WhatsApp Button','SEO Ready'] },
      { label:'Premium', badge:'#123B29', badgeText:'#fff', price:'₹15,000', period:'one-time',
        features:['10 Page Website','5 Custom Templates','Booking Integration','Blog Section','Speed Optimized','1 Month Support'] }
    ]
  },
  { id:'local-seo', cat:'seo', name:'Local SEO for Website',
    desc:'Rank higher on Google for local salon searches',
    tiers:[
      { label:'Starter', badge:'#E4EFE7', badgeText:'#1E5940', price:'₹3,000', period:'one-time',
        features:['Citations Building','3k Directory Links','Local Listing Setup'] },
      { label:'Growth', badge:'#1E5940', badgeText:'#fff', price:'₹5,000', period:'one-time',
        features:['On-Page SEO','Reference Building','Keyword Optimization','Google Analytics Setup'] },
      { label:'Premium', badge:'#123B29', badgeText:'#fff', price:'₹8,000', period:'one-time',
        features:['Full On-Page SEO','500+ Citations','Competitor Analysis','Monthly Rank Report','Content Optimization'] }
    ]
  },
  { id:'google-profile', cat:'seo', name:'Google Profile Setup',
    desc:'Dominate Google Maps and local pack results',
    tiers:[
      { label:'Starter', badge:'#E4EFE7', badgeText:'#1E5940', price:'₹5,000', period:'one-time',
        features:['Profile Setup','Google Verification','Basic Optimisation','Cover Photo Setup'] },
      { label:'Growth', badge:'#1E5940', badgeText:'#fff', price:'₹7,000', period:'/month',
        features:['10 Creative Posts/mo','10 Google Posts/mo','Monthly Optimization','Review Responses'] },
      { label:'Premium', badge:'#123B29', badgeText:'#fff', price:'₹10,000', period:'/month',
        features:['20 Creative Posts/mo','20 Google Posts/mo','Full Optimization','Priority Responses','Performance Report'] }
    ]
  },
  { id:'seo-on-profile', cat:'seo', name:'SEO — On Profile',
    desc:'Optimize your Google Business profile content',
    tiers:[
      { label:'Starter', badge:'#E4EFE7', badgeText:'#1E5940', price:'₹5,000', period:'one-time',
        features:['100 Pictures Upload','Photo Optimization','Alt Text & Tags','Profile Completeness'] },
      { label:'Growth', badge:'#1E5940', badgeText:'#fff', price:'₹5,000', period:'one-time',
        features:['100 Post Optimizations','Keyword Rich Posts','CTA in Every Post','Category Optimization'] },
      { label:'Premium', badge:'#123B29', badgeText:'#fff', price:'₹2,000', period:'one-time',
        features:['Google Feedback Setup','Negative Review Response','Owner Reply Templates','Review Management'] }
    ]
  },
  { id:'seo-off-profile', cat:'seo', name:'SEO — Off Profile',
    desc:'Build authority with external signals and citations',
    tiers:[
      { label:'Starter', badge:'#E4EFE7', badgeText:'#1E5940', price:'₹3,000', period:'one-time',
        features:['Google Maps Optimization','One-time Activity','Map Pin Optimization'] },
      { label:'Growth', badge:'#1E5940', badgeText:'#fff', price:'₹3,000', period:'one-time',
        features:['100 Location Citations','Directory Posting','NAP Consistency','Geo Targeting'] },
      { label:'Premium', badge:'#123B29', badgeText:'#fff', price:'₹5,000', period:'one-time',
        features:['Everything in Growth','Citation Audit','Competitor Citation Gap','Monthly Monitoring'] }
    ]
  },
  { id:'insta-ads', cat:'social', name:'Instagram Ads',
    desc:'Reach new clients with targeted Instagram campaigns',
    tiers:[
      { label:'Starter', badge:'#F1E3EC', badgeText:'#7A3B5E', price:'₹5,000', period:'one-time',
        features:['Ad Account Setup','Campaign Structure','Audience Research','Creative Brief'] },
      { label:'Growth', badge:'#7A3B5E', badgeText:'#fff', price:'₹5,000', period:'per campaign',
        features:['Ad Setup + Optimization','2 Campaigns','20 Day Duration','Weekly Reporting','A/B Testing'] },
      { label:'Premium', badge:'#4A1F39', badgeText:'#fff', price:'₹15,000', period:'/month',
        features:['Monthly Ad Management','3–5 Campaigns','60 Day Cycles','Daily Monitoring','Creative Design','ROI Reporting'] }
    ]
  },
  { id:'google-ads', cat:'ads', name:'Google Ads',
    desc:'Get bookings from people actively searching for salons',
    tiers:[
      { label:'Starter', badge:'#F5E7E0', badgeText:'#B15A3E', price:'₹5,000', period:'one-time',
        features:['Landing Page Setup','5 Ready Templates','Conversion Tracking','Basic Setup'] },
      { label:'Growth', badge:'#B15A3E', badgeText:'#fff', price:'₹10,000', period:'per campaign',
        features:['Ad Setup + Optimization','1 Campaign','20 Day Duration','Search + Display','Keyword Research','Weekly Report'] },
      { label:'Premium', badge:'#6E3423', badgeText:'#fff', price:'₹30,000', period:'/month',
        features:['Full Ad Management','3 Campaigns','60 Day Cycles','All Ad Types','5 Landing Pages','Daily Optimization','ROI Dashboard'] }
    ]
  },
  { id:'whatsapp', cat:'whatsapp', name:'WhatsApp API',
    desc:'Automated WhatsApp campaigns and push notifications',
    tiers:[
      { label:'Starter', badge:'#F3ECD8', badgeText:'#9A7B1E', price:'₹5,000', period:'one-time',
        features:['WhatsApp API Setup','Business Verification','Template Approval','Auto-reply Setup'] },
      { label:'Growth', badge:'#9A7B1E', badgeText:'#fff', price:'₹5,000', period:'/month',
        features:['1000 Push Notifications','Sent Twice a Month','Custom Templates','Delivery Reports','List Management'] },
      { label:'Premium', badge:'#5E4A10', badgeText:'#fff', price:'₹10,000', period:'/month',
        features:['Push to 5000 Contacts','Business API Access','Priority Delivery','Advanced Automation','Broadcast Scheduling','Analytics Dashboard'] }
    ]
  }
];

export const BUNDLES: Bundle[] =  [
  { id:'local-bundle', name:'Local Visibility Bundle', services:['website','local-seo','google-profile'], discount:3000 },
  { id:'growth-bundle', name:'Growth Accelerator Bundle', services:['insta-ads','google-ads','whatsapp'], discount:4000 },
  { id:'seo-bundle', name:'SEO Power Pack', services:['local-seo','seo-on-profile','seo-off-profile'], discount:2500 }
];
