export const truncateString = (str, maxLength = 12) => {
  return str?.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const getMembershipDuration = (createdAt) => {
  if (!createdAt) return "";
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears >= 1) {
    return `${diffYears} Year${diffYears > 1 ? "s" : ""} on our platform`;
  } else {
    return `${diffDays} Day${diffDays !== 1 ? "s" : ""} on our platform`;
  }
};

export async function fetchAllLeadsFields(supabase, fields) {
  let allLeads = [];
  let from = 0;
  const batchSize = 1000;
  let done = false;
  while (!done) {
    const { data, error } = await supabase
      .from("leads")
      .select(fields)
      .range(from, from + batchSize - 1);
    if (error) throw error;
    allLeads = allLeads.concat(data);
    if (!data || data.length < batchSize) {
      done = true;
    } else {
      from += batchSize;
    }
  }
  return allLeads;
}

export const formatTime = (timestamp) => {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const diffMs = now - createdAt;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const countryCoordinates = {
  "United States": [37.0902, -95.7129],
  Germany: [51.1657, 10.4515],
  Nigeria: [9.082, 8.6753],
  France: [46.2276, 2.2137],
  Canada: [56.1304, -106.3468],
  India: [20.5937, 78.9629],
  "United Kingdom": [55.3781, -3.436],
  Australia: [-25.2744, 133.7751],
  Brazil: [-14.235, -51.9253],
  Japan: [36.2048, 138.2529],
  Spain: [40.4637, -3.7492],
  Italy: [41.8719, 12.5674],
  China: [35.8617, 104.1954],
  Russia: [61.524, 105.3188],
  Mexico: [23.6345, -102.5528],
  Netherlands: [52.1326, 5.2913],
  Norway: [60.472, 8.4689],
  Denmark: [56.2639, 9.5018],
  Sweden: [60.1282, 18.6435],
  Switzerland: [46.8182, 8.2275],
  Belgium: [50.5039, 4.4699],
  Austria: [47.5162, 14.5501],
  Ireland: [53.4129, -8.2439],
  Portugal: [39.3999, -8.2245],
  Poland: [51.9194, 19.1451],
  Finland: [61.9241, 25.7482],
  Greece: [39.0742, 21.8243],
  "South Korea": [35.9078, 127.7669],
  Turkey: [38.9637, 35.2433],
  Argentina: [-38.4161, -63.6167],
  Chile: [-35.6751, -71.543],
  Colombia: [4.5709, -74.2973],
  "South Africa": [-30.5595, 22.9375],
  Egypt: [26.8206, 30.8025],
  Israel: [31.0461, 34.8516],
  Indonesia: [-0.7893, 113.9213],
  Malaysia: [4.2105, 101.9758],
  Philippines: [12.8797, 121.774],
  Thailand: [15.87, 100.9925],
  "Saudi Arabia": [23.8859, 45.0792],
  "United Arab Emirates": [23.4241, 53.8478],
  Singapore: [1.3521, 103.8198],
  "New Zealand": [-40.9006, 174.886],
  Pakistan: [30.3753, 69.3451],
  Ukraine: [48.3794, 31.1656],
  Romania: [45.9432, 24.9668],
  "Czech Republic": [49.8175, 15.473],
  Hungary: [47.1625, 19.5033],
  Vietnam: [14.0583, 108.2772],
};

export const countryNameToCode = {
  "United States": "US",
  Germany: "DE",
  Nigeria: "NG",
  France: "FR",
  Canada: "CA",
  India: "IN",
  "United Kingdom": "GB",
  Australia: "AU",
  Brazil: "BR",
  Japan: "JP",
  Spain: "ES",
  Italy: "IT",
  China: "CN",
  Russia: "RU",
  Mexico: "MX",
  Netherlands: "NL",
  Norway: "NO",
  Denmark: "DK",
  Sweden: "SE",
  Switzerland: "CH",
  Belgium: "BE",
  Austria: "AT",
  Ireland: "IE",
  Portugal: "PT",
  Poland: "PL",
  Finland: "FI",
  Greece: "GR",
  "South Korea": "KR",
  Turkey: "TR",
  Argentina: "AR",
  Chile: "CL",
  Colombia: "CO",
  "South Africa": "ZA",
  Egypt: "EG",
  Israel: "IL",
  Indonesia: "ID",
  Malaysia: "MY",
  Philippines: "PH",
  Thailand: "TH",
  "Saudi Arabia": "SA",
  "United Arab Emirates": "AE",
  Singapore: "SG",
  "New Zealand": "NZ",
  Pakistan: "PK",
  Ukraine: "UA",
  Romania: "RO",
  "Czech Republic": "CZ",
  Hungary: "HU",
  Vietnam: "VN",
};
