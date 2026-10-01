import { ChatMessage } from '../types';

export const CHAT_KNOWLEDGE: Record<
  string,
  { en: string; hi: string; ch: string; suggestions?: string[] }
> = {
  default: {
    en: "Namaste! I am **Dharohar AI**, your smart tourism companion for Chhattisgarh. I can curate personalized itineraries, provide real-time crowd alerts, suggest indigenous delicacies (like Chila & Fara), or connect you with verified tribal artisans.",
    hi: "नमस्ते! मैं **धरोहर AI** हूँ, छत्तीसगढ़ पर्यटन के लिए आपका डिजिटल साथी। मैं आपके लिए यात्रा कार्यक्रम, लाइव भीड़ अपडेट, पारंपरिक व्यंजन और स्थानीय शिल्पकारों की जानकारी दे सकता हूँ।",
    ch: "जय जोहार संगी! मैं **धरोहर AI** हरंव, छत्तीसगढ़ के सुंदर भुइयां म तोर सुग्घर साथी। बस्तर के झरना, मैनपाट के मठ, या चीला-फरा के स्वाद—जउन पूछना हे पूछव!",
    suggestions: [
      '3 days in Bastar under ₹8,000',
      'What local food should I try?',
      'Which places have low crowds right now?',
      'How does Dharohar Pass work?'
    ]
  },
  bastar_budget: {
    en: `### 🌿 3-Day Bastar Eco Itinerary (Under ₹8,000)
- **Day 1: Waterfalls & River Sunset**
  - Morning: Arrive in Jagdalpur, transfer to Chitrakote Waterfalls.
  - Afternoon: Country boat ride into the misty spray with Gond boatmen (₹200).
  - Food: Hot crispy Chila with charred tomato chutney.
  - Stay: Dhurwa Eco Homestay in Kotamsar (₹1,650/night).
- **Day 2: Caves & Tribal Artisans**
  - Morning: Kutumsar Cave torch-lit trek with forest guide Sukhdev Baghel (₹950).
  - Afternoon: Kondagaon Dokra Bell Metal Casting workshop (₹1,250).
  - Food: Woodfire-baked Angakar Roti & fresh Amat.
- **Day 3: Cascades & Forest Lore**
  - Morning: Tirathgarh 300ft stepped cascades in Kanger Valley.
  - Afternoon: Bastar Haat market visit for wild honey & sisal souvenirs.
- **Total Estimated Budget:** ~₹6,400 (Leaves ₹1,600 buffer).
- **Local Impact:** 89% of your spending stays directly with tribal families!`,
    hi: `### 🌿 3-दिवसीय बस्तर यात्रा (₹8,000 के अंदर)
- **पहला दिन: जलप्रपात और इंद्रावती**
  - सुबह: जगदलपुर से चित्रकूट जलप्रपात ("भारत का नियाग्रा")।
  - दोपहर: गोंड नाविकों के साथ नाव की सैर और चीला-टमाटर चटनी का नाश्ता।
  - शाम: कोटमसर में धुर्वा इको होमस्टे।
- **दूसरा दिन: कोटमसर गुफा और शिल्प कला**
  - सुबह: गाइड सुखदेव बघेल के साथ कोटमसर की चूना पत्थर गुफाएँ।
  - दोपहर: कोण्डागांव में डोकरा घंटी धातु ढलाई कार्यशाला।
- **तीसरा दिन: तीरथगढ़ एवं स्थानीय हाट**
  - सुबह: तीरथगढ़ का 300 फीट का झरना।
  - दोपहर: जगदलपुर का आदिवासी हाट और वन शहद।
- **कुल अनुमानित खर्च:** लगभग ₹6,400 (89% राशि सीधे स्थानीय ग्रामीणों तक पहुँचती है)!`,
    ch: `### 🌿 3 दिन के बस्तर सैर (₹8,000 म)
- **पहिला दिन:** चित्रकूट जलप्रपात जावव। नाव म बइठके इंद्रावती के फुहार के आनंद लेवव। गरम-गरम चीला अउ भूंजा टमाटर के चटनी खावव।
- **दूसरा दिन:** कोटमसर गुफा म अन्हरिया के बीच अचरज देखव, फेर कोण्डागांव जाके डोकरा पीतल के घंटी अउ हिरन बनाना सीखव।
- **तीसरा दिन:** तीरथगढ़ झरना नहावव अउ संझा के बस्तर के हाट म वन महुआ के शहद अउ सामान खरीदव।
- **खर्चा:** ₹6,400 के करीब, अउ 89% पइसा हमर बस्तर के भाई-बहिनी मन के हाथ म जाही!`
  },
  food: {
    en: `### 🍲 Must-Try Traditional Chhattisgarh Delicacies:
1. **Chila:** Fermented thin rice crepes served with wood-charred spicy tomato and garlic chutney.
2. **Fara:** Steamed rice-flour dumplings tempered with sesame seeds (til), mustard, and green chilies.
3. **Bafauri:** Healthy zero-oil steamed chana dal cakes seasoned with mountain herbs (Baiga specialty).
4. **Dubki Kadi:** Tender urad dal dumplings poached in sour buttermilk and roasted methi gravy.
5. **Angakar Roti:** Thick flatbread wrapped in fresh Sal leaves and slow-baked directly in charcoal embers.
6. **Amat:** Bastar’s iconic bamboo shoot and mixed forest vegetable stew.`,
    hi: `### 🍲 छत्तीसगढ़ के पारंपरिक स्वाद:
1. **चीला:** खमीरीकृत चावल का पतला डोसा, जिसे भुने टमाटर और लहसुन की तीखी चटनी के साथ परोसा जाता है।
2. **फरा:** उबले चावल के आटे से बने भाप के नमकीन रोल, तिल और राई के बघार के साथ।
3. **बफौरी:** चना दाल और जड़ी-बूटियों से बना भाप का तेल-मुक्त व्यंजन (बैगा जनजाति का प्रिय)।
4. **डूबकी कढ़ी:** छाछ और मेथी की कढ़ी में पकाई गई उड़द दाल की स्वादिष्ट डूबकी।
5. **अंगराकर रोटी:** साल के पत्तों में लपेटकर अंगारों पर सेकी गई पारंपरिक मोटी रोटी।
6. **आमाट:** ताजे बांस के करील और वन सब्जियों का स्वादिष्ट सूप।`,
    ch: `### 🍲 हमर छत्तीसगढ़ के सुग्घर खान-पान:
1. **चीला अउ टमाटर चटनी:** गरमा-गरम चीला, संग म भूंजा टमाटर अउ मिरचा के चटनी।
2. **फरा:** चावल आटा के फरा, तिल अउ सरसों के बघार लगे।
3. **बफौरी:** चना दाल के भाप म पके तेल-रहित बफौरी।
4. **डूबकी कढ़ी:** मही (मट्ठा) म उबलत उड़द दाल के डूबकी।
5. **अंगराकर रोटी:** साल पत्ता म लपेट के अंगरा म सेंके रोटी, जउन खाय म एक नंबर लागथे!`
  },
  crowd: {
    en: `### 📊 Real-Time Tourism Load Status
- 🟢 **LOW Crowd (Great time to visit):**
  - **Tamda Ghumar & Mendri Ghumar:** Hidden canyons with zero tourist congestion.
  - **Madku Dweep Island:** Serene 11th-century Kalachuri temple ruins on Shivnath River.
  - **Sirpur Heritage Complex:** Peaceful morning walks with gentle footfall.
  - **Kondagaon Craft Village:** Intimate artisan visits.
- 🟡 **MODERATE Crowd:**
  - **Chitrakote Falls:** 420 / 850 capacity (visit early morning 06:30 - 09:30 AM).
  - **Mainpat Plateau:** 340 / 700 capacity.
- 🔴 **HIGH Crowd:**
  - **Danteshwari Temple Dantewada:** 780 visitors (recommend booking morning slot).
  - **Dongargarh Bambleshwari Ropeway:** 890 visitors.`,
    hi: `### 📊 वर्तमान पर्यटन भीड़ स्तर
- 🟢 **कम भीड़ (भ्रमण का सबसे उपयुक्त समय):**
  - **तामड़ा घूमर एवं मेंद्री घूमर:** शांत घाटियाँ और झरने।
  - **मदकू द्वीप:** शिवनाथ नदी पर प्राचीन मंदिर।
  - **सिरपुर ऐतिहासिक परिसर:** शांतिपूर्ण सुबह का समय।
- 🟡 **मध्यम भीड़:**
  - **चित्रकूट जलप्रपात:** 420 / 850 क्षमता (सुबह 06:30 - 09:30 AM सर्वोत्तम)।
- 🔴 **अधिक भीड़:**
  - **दंतेश्वरी मंदिर:** 780 दर्शनार्थी (सुबह का समय चुनें)।`,
    ch: `### 📊 अबड़ भीड़ हे कि शांत हे?
- 🟢 **एती भीड़ नइ हे (जाए बर सबले बढिया):** तामड़ा घूमर, मदकू द्वीप अउ सिरपुर के मंदिर म एकदम शांति हे।
- 🟡 **ठीक-ठाक मानखे:** चित्रकूट म अभी आधा भरल हे। बिहनिया जाहू त मजा आही।
- 🔴 **ज्यादा भीड़:** दंतेश्वरी माता मंदिर अउ डोंगरगढ़ म बहुत भीड़ हे, सबेरे-सबेरे दर्शन करव संगी!`
  },
  pass: {
    en: `### 🛂 Digital Dharohar Pass
The **Dharohar Pass** is your digital cultural passport for Chhattisgarh:
- **Tiers:** Explorer → Custodian → Heritage Ambassador.
- **Earn Badges:** Heritage Explorer, Nature Seeker, Tribal Culture Explorer, Responsible Traveler, Local Supporter.
- **Digital Certificates:** Verified records for attending artisan workshops (e.g. Dokra casting, Cave exploration) with downloadable keepsake certificates.
- **Impact Tracking:** Shows exactly how much of your spending stays in the local village economy.`,
    hi: `### 🛂 डिजिटल धरोहर पास
**धरोहर पास** छत्तीसगढ़ के लिए आपका डिजिटल सांस्कृतिक पासपोर्ट है:
- **स्तर:** एक्सप्लोरर → कस्टोडियन → हेरिटेज एंबेसडर।
- **बैज अर्जित करें:** हेरिटेज एक्सप्लोरर, नेचर सीकर, ट्राइबल कल्चर एक्सप्लोरर, जिम्मेदार यात्री, लोकल सपोर्टर।
- **डिजिटल प्रमाण पत्र:** शिल्प कार्यशालाओं के सत्यापन रिकॉर्ड, जिन्हें आप डाउनलोड और साझा कर सकते हैं।
- **स्थानीय प्रभाव:** दर्शाता है कि आपका खर्च ग्रामीण अर्थव्यवस्था को कितना सशक्त बना रहा है।`,
    ch: `### 🛂 धरोहर पास का ए?
धरोहर पास हमर डिजिटल पहचान हे। जब तुमन छत्तीसगढ़ म घूमत जाहू, नवा जगह देखहू अउ कारीगर मन से मिलहू, त तोर पास म लेवल बढ़ही अउ डिजिटल प्रमाण पत्र मिलही!`
  }
};

export const chatService = {
  processQuery(query: string, language: 'en' | 'hi' | 'ch' = 'en'): ChatMessage {
    const q = query.toLowerCase();

    let key = 'default';
    if (q.includes('bastar') || q.includes('8000') || q.includes('budget') || q.includes('itinerary') || q.includes('3 day') || q.includes('plan')) {
      key = 'bastar_budget';
    } else if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('chila') || q.includes('fara') || q.includes('taste')) {
      key = 'food';
    } else if (q.includes('crowd') || q.includes('busy') || q.includes('load') || q.includes('where') || q.includes('visit') || q.includes('offbeat')) {
      key = 'crowd';
    } else if (q.includes('pass') || q.includes('dharohar') || q.includes('badge') || q.includes('certificate')) {
      key = 'pass';
    }

    const item = CHAT_KNOWLEDGE[key] || CHAT_KNOWLEDGE.default;
    const text = item[language] || item.en;

    return {
      id: 'bot-' + Date.now(),
      sender: 'assistant',
      text,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: item.suggestions || [
        '3 days in Bastar under ₹8,000',
        'What local food should I try?',
        'Where are the least crowded spots?'
      ]
    };
  }
};
