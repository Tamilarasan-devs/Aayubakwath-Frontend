import blogBloodSugar from '../assets/images/blog/blog_blood_sugar.png';
import blogMemoryFocus from '../assets/images/blog/blog_memory_focus.png';
import blogCholesterol from '../assets/images/blog/blog_cholesterol.png';
import blogHealthyHabits from '../assets/images/blog/blog_healthy_habits.png';
import blogEnergyStamina from '../assets/images/blog/blog_energy_stamina.png';
import blogHerbalVsSynthetic from '../assets/images/blog/blog_herbal_vs_synthetic.png';

const blogPosts = [
  {
    id: 1,
    slug: "diet-foundation-blood-sugar-control",
    category: "Nutrition",
    title: "Diet: The Foundation of Blood Sugar Control",
    excerpt: "Your daily food choices play the biggest role in managing blood sugar. Discover the right foods, fiber sources, and hydration tips to maintain stable glucose levels naturally.",
    image: blogBloodSugar,
    date: "Apr 01, 2026",
    readTime: "4 min read",
    featured: true,
    sections: [
      {
        heading: "Choose Low Glycemic Foods",
        content: ["Foods that release sugar slowly help maintain stable glucose levels:"],
        subsections: [],
        list: ["Whole grains (brown rice, oats)", "Vegetables (especially leafy greens)", "Fruits like apples and berries"]
      },
      {
        heading: "Increase Fiber Intake",
        content: ["Fiber slows down sugar absorption and improves digestion."],
        subsections: [],
        list: ["Lentils", "Vegetables", "Seeds"]
      },
      {
        heading: "Include Protein in Every Meal",
        content: ["Protein helps prevent sudden spikes in blood sugar."],
        subsections: [],
        list: ["Eggs", "Nuts", "Dairy products", "Plant-based proteins"]
      },
      {
        heading: "Avoid Refined Sugars & Processed Foods",
        content: ["Reduce intake of:"],
        subsections: [],
        list: ["Sugary drinks", "White bread", "Packaged snacks"]
      },
      {
        heading: "Stay Hydrated",
        content: ["Drinking enough water helps regulate blood sugar levels and improves metabolism."],
        subsections: [],
        list: []
      }
    ]
  },
  {
    id: 2,
    slug: "improve-memory-focus-naturally",
    category: "Brain Health",
    title: "How to Improve Memory and Focus Naturally",
    excerpt: "In today's fast-paced world, many people struggle with poor concentration and mental fatigue. The good news is that memory and focus can be improved naturally through diet, sleep, and herbal support.",
    image: blogMemoryFocus,
    date: "Mar 28, 2026",
    readTime: "8 min read",
    featured: false,
    sections: [
      {
        heading: "Why Memory and Focus Are Important",
        content: ["Good memory and concentration are important for:"],
        list: ["Students and learning", "Working professionals", "Business owners", "Daily decision making", "Mental clarity", "Productivity"],
        subsections: []
      },
      {
        heading: "Brain Foods That Improve Memory",
        content: ["Food plays a major role in brain function. The brain needs healthy fats, antioxidants, vitamins, and minerals to work efficiently.", "Include these foods in your daily diet:"],
        list: ["Almonds", "Walnuts", "Pumpkin seeds", "Fruits (especially berries and apples)", "Leafy green vegetables", "Whole grains", "Milk and curd", "Dark chocolate (in small amounts)", "Green tea"],
        subsections: [
          {
            heading: "Drink Enough Water",
            content: ["Even mild dehydration can reduce concentration and memory performance. Drink at least 2–3 liters of water daily."]
          }
        ]
      },
      {
        heading: "Sleep Is Very Important for Memory",
        content: ["Sleep plays a critical role in memory and brain function. During sleep, the brain processes information and stores memories."],
        list: [],
        subsections: [
          {
            heading: "Effects of Poor Sleep",
            content: [],
            list: ["Poor concentration", "Memory problems", "Mood changes", "Mental fatigue", "Slow thinking"]
          },
          {
            heading: "Tips for Better Sleep",
            content: [],
            list: ["Sleep at the same time daily", "Avoid mobile phone before sleep", "Avoid heavy meals at night", "Keep room dark and quiet", "Aim for 7–8 hours sleep"]
          }
        ]
      },
      {
        heading: "Herbal Ingredients That Support Brain Function",
        content: ["Many natural herbs have been used for brain health for centuries. Some of the most popular and effective herbs include Bacopa, Ginkgo, and Ashwagandha."],
        list: [],
        subsections: [
          {
            heading: "Bacopa",
            content: [],
            list: ["Supports memory and learning", "Helps improve concentration", "Supports brain function"]
          },
          {
            heading: "Ginkgo Biloba",
            content: [],
            list: ["Supports blood circulation to the brain", "Helps improve focus and mental clarity", "Supports cognitive performance"]
          },
          {
            heading: "Ashwagandha",
            content: [],
            list: ["Helps reduce stress", "Supports brain health", "Improves mental performance", "Supports memory and focus"]
          }
        ]
      },
      {
        heading: "Reduce Screen Time",
        content: ["One of the biggest reasons for poor focus today is excessive screen time.", "Too much mobile phone, laptop, TV, and social media can reduce attention span and memory."],
        list: [],
        subsections: [
          {
            heading: "Tips to Reduce Screen Time",
            content: [],
            list: ["Follow the 20-20-20 rule (Every 20 minutes, look 20 feet away for 20 seconds)", "Avoid phone immediately after waking up", "Avoid phone before sleep", "Take regular breaks while working", "Spend time reading books instead of scrolling"]
          }
        ]
      },
      {
        heading: "Exercise for Brain Health",
        content: ["Exercise improves blood flow to the brain and helps memory and concentration.", "Even 20–30 minutes daily exercise helps brain performance."],
        list: ["Walking", "Yoga", "Meditation", "Breathing exercises", "Stretching"],
        subsections: []
      },
      {
        heading: "Daily Routine for Better Memory and Focus",
        content: ["Follow this simple routine:"],
        list: [],
        subsections: [
          {
            heading: "Morning",
            content: [],
            list: ["Wake up early", "Drink water", "Light exercise", "Healthy breakfast"]
          },
          {
            heading: "Afternoon",
            content: [],
            list: ["Balanced lunch", "Short walk"]
          },
          {
            heading: "Evening",
            content: [],
            list: ["Reduce screen time", "Read books / learning"]
          },
          {
            heading: "Night",
            content: [],
            list: ["Light dinner", "Sleep early"]
          }
        ]
      },
      {
        heading: "Final Thoughts",
        content: ["Improving memory and focus naturally is possible with simple lifestyle changes. A healthy diet, proper sleep, herbal support, reduced screen time, and regular exercise can significantly improve brain performance.", "Natural supplements like Aayubakwath Brain Tonic, which contain Bacopa, Ginkgo, and Ashwagandha, can also help support memory, focus, and cognitive function when used along with a healthy lifestyle."],
        list: [],
        subsections: []
      },
      {
        heading: "Disclaimer",
        content: ["This article is for informational purposes only. Health supplements are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before using supplements."],
        list: [],
        subsections: [],
        isDisclaimer: true
      }
    ]
  },
  {
    id: 3,
    slug: "reduce-cholesterol-naturally",
    category: "Heart Health",
    title: "Simple Ways to Reduce Cholesterol Naturally",
    excerpt: "Maintaining healthy cholesterol levels is essential for heart health. The good news is that cholesterol can be managed naturally with the right combination of diet, exercise, herbal support, and lifestyle changes.",
    image: blogCholesterol,
    date: "Mar 22, 2026",
    readTime: "7 min read",
    featured: false,
    sections: [
      {
        heading: "Why Cholesterol Balance Is Important",
        content: ["Cholesterol is a fatty substance found in your blood. While your body needs some cholesterol, high levels can lead to serious health problems.", "Maintaining balanced cholesterol helps:"],
        list: ["Support heart health", "Improve blood circulation", "Reduce risk of lifestyle-related issues", "Support overall wellness"],
        subsections: []
      },
      {
        heading: "Follow a Heart-Healthy Diet",
        content: ["Your diet plays a major role in controlling cholesterol levels."],
        list: [],
        subsections: [
          {
            heading: "Eat More Fiber-Rich Foods",
            content: ["Fiber helps reduce bad cholesterol (LDL):"],
            list: ["Oats", "Whole grains", "Fruits (apples, oranges)", "Vegetables", "Legumes"]
          },
          {
            heading: "Include Healthy Fats",
            content: ["Replace unhealthy fats with good fats:"],
            list: ["Nuts (almonds, walnuts)", "Seeds", "Olive oil"]
          },
          {
            heading: "Avoid Trans Fats & Fried Foods",
            content: ["Limit:"],
            list: ["Fast food", "Bakery items", "Processed snacks"]
          },
          {
            heading: "Add Plant-Based Foods",
            content: ["Vegetables and fruits help improve overall lipid balance."],
            list: []
          }
        ]
      },
      {
        heading: "Exercise Regularly",
        content: ["Physical activity helps increase good cholesterol (HDL) and reduce bad cholesterol."],
        list: [],
        subsections: [
          {
            heading: "Benefits of Exercise",
            content: [],
            list: ["Improves heart health", "Helps maintain weight", "Supports metabolism"]
          },
          {
            heading: "Best Exercises",
            content: [],
            list: ["Walking (30 minutes daily)", "Cycling", "Jogging", "Yoga"]
          }
        ]
      },
      {
        heading: "Herbal Ingredients That Support Cholesterol Balance",
        content: ["Natural herbs have been traditionally used to support healthy cholesterol levels."],
        list: [],
        subsections: [
          {
            heading: "Garlic",
            content: [],
            list: ["Supports heart health", "Helps reduce cholesterol levels"]
          },
          {
            heading: "Green Tea",
            content: [],
            list: ["Rich in antioxidants", "Supports fat metabolism"]
          },
          {
            heading: "Fenugreek",
            content: [],
            list: ["Helps reduce cholesterol absorption", "Supports metabolic health"]
          },
          {
            heading: "Ginger",
            content: [],
            list: ["Supports digestion", "Helps improve circulation"]
          },
          {
            heading: "Berberine",
            content: [],
            list: ["Supports lipid metabolism", "Helps maintain cholesterol balance"]
          }
        ]
      },
      {
        heading: "Maintain a Healthy Lifestyle",
        content: ["Small lifestyle changes can make a big difference."],
        list: [],
        subsections: [
          {
            heading: "Maintain Healthy Weight",
            content: ["Excess weight can increase cholesterol levels."],
            list: []
          },
          {
            heading: "Avoid Smoking & Alcohol",
            content: ["Both smoking and excess alcohol can affect cholesterol and heart health."],
            list: []
          },
          {
            heading: "Sleep Well",
            content: ["Poor sleep can negatively affect cholesterol balance."],
            list: ["Aim for 7–8 hours sleep", "Follow a regular sleep schedule"]
          },
          {
            heading: "Manage Stress",
            content: ["Chronic stress can increase cholesterol. Practice relaxation techniques like yoga and meditation."],
            list: []
          }
        ]
      },
      {
        heading: "Final Thoughts",
        content: ["Reducing cholesterol naturally is possible with the right diet, regular exercise, and herbal support. Natural supplements like Aayubakwath Cholesterol Balance can also support healthy cholesterol levels when used alongside a balanced lifestyle."],
        list: [],
        subsections: []
      },
      {
        heading: "Disclaimer",
        content: ["This article is for informational purposes only. Health supplements are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before using supplements."],
        list: [],
        subsections: [],
        isDisclaimer: true
      }
    ]
  },
  {
    id: 4,
    slug: "daily-habits-healthy-life",
    category: "Lifestyle",
    title: "Daily Habits for a Healthy Life",
    excerpt: "Simple daily habits can significantly improve your health and quality of life. Learn about hydration, exercise, nutrition, sleep, and stress management for lasting wellness.",
    image: blogHealthyHabits,
    date: "Mar 15, 2026",
    readTime: "7 min read",
    featured: false,
    sections: [
      {
        heading: "Start Your Day with Water",
        content: ["Drinking water first thing in the morning helps:"],
        list: ["Flush toxins", "Boost metabolism", "Improve energy", "Support digestion", "Improve skin health"],
        subsections: []
      },
      {
        heading: "Eat a Healthy Breakfast",
        content: ["A balanced breakfast provides energy for the entire morning."],
        list: [],
        subsections: [
          {
            heading: "Good Breakfast Options",
            content: [],
            list: ["Oats with fruits", "Eggs and whole grain toast", "Smoothie with protein", "Yogurt with nuts"]
          }
        ]
      },
      {
        heading: "Move Your Body Every Day",
        content: ["Regular physical activity improves energy, mood, and overall health."],
        list: ["Walking", "Yoga", "Stretching", "Cycling", "Home exercises"],
        subsections: [
          {
            heading: "Benefits of Daily Exercise",
            content: [],
            list: ["Improves heart health", "Supports weight management", "Boosts mood", "Improves sleep"]
          }
        ]
      },
      {
        heading: "Eat More Natural Foods",
        content: ["Focus on whole, natural foods:"],
        list: ["Fruits and vegetables", "Whole grains", "Lean proteins", "Nuts and seeds", "Healthy fats"],
        subsections: []
      },
      {
        heading: "Sleep Properly",
        content: ["Sleep is essential for physical and mental health."],
        list: [],
        subsections: [
          {
            heading: "Tips for Better Sleep",
            content: [],
            list: ["Sleep at the same time daily", "Avoid caffeine late in the day", "Keep room dark and cool", "Limit screen time before bed", "Aim for 7–8 hours"]
          }
        ]
      },
      {
        heading: "Manage Stress",
        content: ["Chronic stress affects physical and mental health."],
        list: [],
        subsections: [
          {
            heading: "Stress Management Tips",
            content: [],
            list: ["Practice deep breathing", "Meditate regularly", "Spend time in nature", "Talk to friends and family", "Take breaks during work"]
          }
        ]
      },
      {
        heading: "Drink Enough Water",
        content: ["Staying hydrated throughout the day is essential.", "Benefits:"],
        list: ["Improves energy", "Supports digestion", "Improves skin", "Supports brain function", "Helps metabolism"],
        subsections: []
      },
      {
        heading: "Role of Nutritional Support",
        content: ["Sometimes daily food may not provide all the nutrients your body needs. Nutritional supplements can help fill gaps.", "Aayubakwath supplements are designed to support brain health, energy, metabolism, and overall wellness."],
        list: [],
        subsections: []
      },
      {
        heading: "Final Thoughts",
        content: ["Small daily habits can make a big impact on health and quality of life. Start with small changes and build consistency."],
        list: [],
        subsections: []
      }
    ]
  },
  {
    id: 5,
    slug: "increase-energy-stamina-naturally",
    category: "Wellness",
    title: "How to Increase Energy and Stamina Naturally",
    excerpt: "Feeling tired and low on energy? Discover natural ways to boost your energy levels through the right foods, exercise, sleep, and herbal support.",
    image: blogEnergyStamina,
    date: "Mar 10, 2026",
    readTime: "5 min read",
    featured: false,
    sections: [
      {
        heading: "Eat Energy Supporting Foods",
        content: ["The right foods can fuel your body naturally:"],
        list: ["Whole grains", "Fruits (bananas, berries)", "Nuts and seeds", "Eggs", "Green vegetables", "Lean proteins"],
        subsections: []
      },
      {
        heading: "Exercise Regularly",
        content: ["Physical activity boosts energy levels and stamina."],
        list: ["Walking (30 minutes daily)", "Yoga", "Stretching", "Cycling", "Strength exercises"],
        subsections: []
      },
      {
        heading: "Sleep Is Very Important",
        content: ["Quality sleep restores energy and supports recovery."],
        list: ["Sleep 7–8 hours daily", "Keep a consistent schedule", "Avoid caffeine before bed", "Create a dark, quiet environment"],
        subsections: []
      },
      {
        heading: "Herbal Support for Energy",
        content: ["Natural herbs can help support energy levels:"],
        list: ["Ashwagandha – supports stamina and reduces stress", "Ginseng – supports energy and endurance", "Moringa – rich in nutrients", "Amla – supports immunity and energy"],
        subsections: []
      },
      {
        heading: "Lifestyle Tips",
        content: ["Small changes can significantly impact energy:"],
        list: ["Stay hydrated", "Take breaks during work", "Manage stress", "Reduce screen time", "Spend time outdoors"],
        subsections: [
          {
            heading: "Conclusion",
            content: ["Increasing energy naturally is possible with proper diet, exercise, sleep, and natural support. Aayubakwath supplements are designed to support energy and overall wellness."],
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 6,
    slug: "herbal-vs-synthetic-supplements",
    category: "Health",
    title: "Herbal Supplements vs Synthetic Supplements – Which is Better?",
    excerpt: "Understanding the difference between herbal and synthetic supplements can help you make better health choices. Learn about their benefits, drawbacks, and which may be right for you.",
    image: blogHerbalVsSynthetic,
    date: "Mar 05, 2026",
    readTime: "5 min read",
    featured: false,
    sections: [
      {
        heading: "What Are Herbal Supplements?",
        content: ["Herbal supplements are made from natural plant-based ingredients. They contain herbs, roots, leaves, and natural extracts."],
        list: ["Made from natural sources", "Gentle on the body", "Used for centuries in traditional medicine", "Support overall wellness"],
        subsections: [
          {
            heading: "Common Herbal Ingredients",
            content: [],
            list: ["Ashwagandha", "Bacopa", "Ginkgo Biloba", "Turmeric", "Moringa"]
          }
        ]
      },
      {
        heading: "What Are Synthetic Supplements?",
        content: ["Synthetic supplements are manufactured in laboratories. They contain chemically produced vitamins and minerals."],
        list: ["Made in laboratories", "Standardized dosage", "Quick absorption"],
        subsections: [
          {
            heading: "Potential Concerns",
            content: [],
            list: ["May contain artificial additives", "Some may have side effects", "May not be absorbed as naturally"]
          }
        ]
      },
      {
        heading: "Which Is Better?",
        content: ["Both types have their place. However, herbal supplements are generally considered gentler and more holistic.", "Aayubakwath focuses on herbal, natural formulations designed to support overall wellness without harsh chemicals."],
        list: [],
        subsections: [
          {
            heading: "Conclusion",
            content: ["Choose supplements based on your needs and always consult a healthcare professional. Natural, herbal supplements like Aayubakwath products can be a great choice for those seeking gentle, plant-based support."],
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 7,
    slug: "nutritional-supplements-modern-lifestyle",
    category: "Nutrition",
    title: "Why Nutritional Supplements Are Important in Modern Lifestyle",
    excerpt: "Due to modern lifestyles and food habits, many people don't get enough nutrients from diet alone. Learn why supplements play an important role in supporting modern health needs.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    featured: false,
    sections: [
      {
        heading: "Reasons Why People Need Supplements Today",
        content: ["Modern lifestyle factors that affect nutrition:"],
        list: ["Skipping meals", "Processed food", "Stress", "Poor sleep", "Pollution", "Soil nutrient reduction", "Lack of exercise"],
        subsections: []
      },
      {
        heading: "Common Effects of Poor Nutrition",
        content: ["Because of these reasons, many people feel:"],
        list: ["Tired", "Low immunity", "Poor concentration", "Weakness", "Poor metabolism"],
        subsections: []
      },
      {
        heading: "Benefits of Nutritional Supplements",
        content: ["Supplements can help:"],
        list: ["Support energy levels", "Support brain health", "Support metabolism", "Support heart health", "Support immunity", "Support overall wellness"],
        subsections: [
          {
            heading: "Conclusion",
            content: ["Supplements should not replace food, but they can support nutrition along with a balanced diet. Aayubakwath supplements are designed to support modern lifestyle health needs like brain health, blood sugar balance, cholesterol balance, energy, and general wellness."],
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 8,
    slug: "signs-body-needs-nutritional-support",
    category: "Health",
    title: "Signs Your Body Needs Nutritional Support",
    excerpt: "Many people don't realize that their body is lacking nutrients. The body gives signals when it needs nutritional support. Learn to recognize these common signs.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    date: "Feb 22, 2026",
    readTime: "4 min read",
    featured: false,
    sections: [
      {
        heading: "Common Signs",
        content: ["If you experience these regularly, your body may need nutritional support:"],
        list: ["Always feeling tired", "Low energy", "Poor concentration", "Memory problems", "Hair fall", "Weak nails", "Poor sleep", "Frequent illness", "Body weakness", "Slow recovery", "Mood changes", "Stress and mental fatigue"],
        subsections: []
      },
      {
        heading: "Causes",
        content: ["These problems may occur due to:"],
        list: ["Poor diet", "Skipping meals", "Stress", "Lack of sleep", "Digestive problems", "Lack of nutrients", "Busy lifestyle"],
        subsections: []
      },
      {
        heading: "What You Should Do",
        content: [],
        list: ["Eat balanced diet", "Drink enough water", "Exercise regularly", "Sleep properly", "Manage stress", "Use nutritional supplements if needed"],
        subsections: [
          {
            heading: "Conclusion",
            content: ["Listen to your body. Small symptoms may indicate nutritional deficiency or need for nutritional support. Nutritional support products from Aayubakwath are designed to support brain health, metabolism, energy, and overall wellness."],
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 9,
    slug: "best-foods-brain-health",
    category: "Brain Health",
    title: "Best Foods for Brain Health",
    excerpt: "The brain needs proper nutrition to function well. Certain foods help improve memory, focus, and brain performance. Discover the best brain-boosting foods.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    featured: false,
    sections: [
      {
        heading: "Nuts",
        content: ["Nuts are rich in healthy fats and vitamin E which support brain function.", "Best nuts:"],
        list: ["Almonds", "Walnuts", "Cashews", "Pistachios"],
        subsections: []
      },
      {
        heading: "Seeds",
        content: ["Seeds contain omega fatty acids and antioxidants.", "Best seeds:"],
        list: ["Pumpkin seeds", "Sunflower seeds", "Flax seeds", "Chia seeds"],
        subsections: []
      },
      {
        heading: "Fish",
        content: ["Fish contains omega-3 fatty acids which support brain health and memory.", "Best fish:"],
        list: ["Salmon", "Sardine", "Mackerel"],
        subsections: []
      },
      {
        heading: "Fruits",
        content: ["Fruits contain antioxidants which protect brain cells.", "Best fruits:"],
        list: ["Blueberries", "Apples", "Oranges", "Banana", "Pomegranate"],
        subsections: []
      },
      {
        heading: "Green Tea",
        content: ["Green tea contains antioxidants and compounds that support brain function and focus."],
        list: [],
        subsections: []
      },
      {
        heading: "Other Brain Foods",
        content: ["Brain support supplements like Aayubakwath Brain Tonic can also support memory and focus along with healthy diet."],
        list: ["Eggs", "Dark chocolate", "Whole grains", "Leafy vegetables", "Milk and curd"],
        subsections: [
          {
            heading: "Conclusion",
            content: ["Eating the right foods daily can improve memory, focus, and brain performance naturally."],
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 10,
    slug: "best-morning-routine-healthy-life",
    category: "Lifestyle",
    title: "Best Morning Routine for Healthy Life",
    excerpt: "Your morning routine decides your energy, productivity, and health for the entire day. Learn the ideal steps for a healthy, productive morning.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    date: "Feb 08, 2026",
    readTime: "5 min read",
    featured: false,
    sections: [
      {
        heading: "Ideal Morning Routine",
        content: [],
        list: [],
        subsections: [
          {
            heading: "Step 1 – Wake Up Early",
            content: ["Waking up early helps:"],
            list: ["Improve productivity", "Improve mental clarity", "Reduce stress", "Maintain routine"]
          },
          {
            heading: "Step 2 – Drink Water",
            content: ["Drink 1–2 glasses of water after waking up."],
            list: []
          },
          {
            heading: "Step 3 – Light Exercise",
            content: ["This improves blood circulation and energy."],
            list: ["Walking", "Stretching", "Yoga", "Breathing exercise"]
          },
          {
            heading: "Step 4 – Healthy Breakfast",
            content: ["Eat a balanced breakfast with:"],
            list: ["Protein", "Fiber", "Healthy fats"]
          },
          {
            heading: "Step 5 – Plan Your Day",
            content: ["Planning reduces stress and improves productivity."],
            list: []
          },
          {
            heading: "Step 6 – Sunlight Exposure",
            content: ["Morning sunlight helps vitamin D and improves mood."],
            list: []
          },
          {
            heading: "Example Morning Routine",
            content: [],
            list: ["Wake up – 6:00 AM", "Drink water", "Exercise – 20 minutes", "Bath", "Healthy breakfast", "Plan day", "Start work"]
          },
          {
            heading: "Conclusion",
            content: ["A good morning routine improves energy, brain function, metabolism, productivity, and overall health.", "Healthy lifestyle along with proper nutrition and supplements like Aayubakwath can support long-term wellness."],
            list: []
          }
        ]
      }
    ]
  }
];

export const categories = ["All", "Brain Health", "Heart Health", "Nutrition", "Health", "Wellness", "Lifestyle"];

export default blogPosts;
