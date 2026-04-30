// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-research",
          title: "Research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-people",
          title: "People",
          description: "members of the group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-my-phd-student-qian-shao-has-been-awarded-the-2023-smu-presidential-doctoral-fellowship",
          title: 'My PhD student, Qian Shao, has been awarded the 2023 SMU Presidential Doctoral...',
          description: "",
          section: "News",},{id: "news-interviewed-by-business-times-turning-point-for-the-taxi-industry",
          title: 'Interviewed by Business Times - Turning point for the taxi industry?',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_2/";
            },},{id: "news-interviewed-by-business-times-how-does-having-more-high-mileage-phvs-fit-our-aim-to-reduce-traffic-snarls",
          title: 'Interviewed by Business Times - How does having more high-mileage PHVs fit our...',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_3/";
            },},{id: "news-paper-accepted-at-icaps-24",
          title: 'Paper accepted at ICAPS-24',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_4/";
            },},{id: "news-paper-accepted-at-ijcai-24",
          title: 'Paper accepted at IJCAI-24',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_5/";
            },},{id: "news-started-as-principal-research-scientist-at-amazon-on-leave-from-smu",
          title: 'Started as Principal Research Scientist at Amazon. (On leave from SMU.)',
          description: "",
          section: "News",},{id: "news-my-phd-students-qian-shao-and-pang-jin-tan-have-both-been-awarded-the-2024-smu-presidential-doctoral-fellowship",
          title: 'My PhD students, Qian Shao and Pang Jin Tan, have both been awarded...',
          description: "",
          section: "News",},{id: "news-granted-patent-on-method-and-system-for-taxi-demand-prediction-using-a-neural-network-model-singapore-patent-10202103115q",
          title: 'Granted Patent on “Method and System for Taxi Demand Prediction Using a Neural...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-the-review-of-economics-and-statistics",
          title: 'Paper accepted at the Review of Economics and Statistics',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_9/";
            },},{id: "news-paper-accepted-at-european-journal-of-operational-research",
          title: 'Paper accepted at European Journal of Operational Research',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_10/";
            },},{id: "news-our-paper-stable-and-fair-cost-allocation-in-platform-enabled-lcl-consolidation-with-pang-jin-tan-is-accepted-at-sixteenth-international-conference-on-computational-logistics-iccl-25",
          title: 'Our paper, “Stable and Fair Cost Allocation in Platform-Enabled LCL Consolidation,” (with Pang...',
          description: "",
          section: "News",},{id: "news-our-paper-predict-social-economic-outcomes-by-transferred-knowledge-with-satellite-imagery-with-yang-tang-yunqiang-zhu-zhiqiang-zou-and-yichen-yang-is-accepted-at-twenty-second-pacific-rim-international-conference-on-artificial-intelligence-pricai-25",
          title: 'Our paper, “Predict Social Economic Outcomes by Transferred Knowledge with Satellite Imagery,” (with...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-annuals-of-operations-research",
          title: 'Paper accepted at Annuals of Operations Research',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/n_13/";
            },},{id: "projects-driver-guidance-system-dgs-for-taxi-drivers",
          title: 'Driver Guidance System (DGS) for Taxi Drivers',
          description: "DGS enables taxi drivers to be more productive by digesting real-time demands and competitions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dgs/";
            },},{id: "projects-learning-by-doing-in-the-age-of-big-data",
          title: 'Learning by Doing in the Age of Big Data',
          description: "When big data meets the theory of &quot;Learning by Doing&quot;.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/grant_SSRTG/";
            },},{id: "projects-smart-barrier-free-access-smartbfa-2-0",
          title: 'Smart Barrier-Free Access (SmartBFA) 2.0',
          description: "Smart guidance for wheelchair users.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/grant_SmartBFA/";
            },},{id: "projects-predictive-mobile-crowdsourcing",
          title: 'Predictive Mobile Crowdsourcing',
          description: "Getting things done by leveraging the power of crowd.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mcs/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV_sfcheng_academic_v2.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%66%63%68%65%6E%67@%73%6D%75.%65%64%75.%73%67", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=zEHb5vMAAAAJ", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/shih-fen-cheng", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/sfcheng-research", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
