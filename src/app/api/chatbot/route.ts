import { NextRequest, NextResponse } from 'next/server';

interface ChatbotResponse {
  response: string;
  suggestions?: string[];
  link?: { text: string; url: string };
}

// Knowledge base for common queries
const knowledgeBase = {
  // Profile related
  profile: {
    create: {
      response: "To create your profile, click on 'Register' in the top navigation or go to /register. Choose whether you're a Student or Alumni, fill in your details, and you'll be all set!",
      suggestions: ["How do I edit my profile?", "What information should I include?"],
      link: { text: "Go to Registration", url: "/register" }
    },
    edit: {
      response: "You can edit your profile by going to your profile page and clicking the edit button. Make sure to keep your information up to date!",
      suggestions: ["How do I change my profile picture?", "What if I can't edit something?"]
    }
  },

  // Gamification
  gamification: {
    general: {
      response: "Our gamification system rewards engagement! Students earn ⭐ stars for activities like creating posts, attending events, and daily logins. Alumni earn 🎯 points and 🏆 badges for mentoring, job postings, and community contributions.",
      suggestions: ["How many stars do I need to level up?", "What badges can I earn?", "How do I check my progress?"],
      link: { text: "View Gamification Rules", url: "/gamification-test" }
    },
    stars: {
      response: "Students earn stars for various activities: 📝 Create community posts (3 stars), 📅 Create events (2 stars), 💬 Comment on posts (1 star), 🔥 Daily login streaks, and 🎉 Event participation.",
      suggestions: ["How do I earn more stars?", "What's my current level?"]
    },
    points: {
      response: "Alumni earn points for: 📝 Create community posts (5 points), 📅 Create events (3 points), 💬 Comment on posts (2 points), 🎯 Post job opportunities (10 points), and 🎓 Mentoring sessions (15 points).",
      suggestions: ["How do I earn badges?", "What's my current level?"]
    }
  },

  // Events
  events: {
    find: {
      response: "You can find events by going to the Events section in the navigation. Browse upcoming events, filter by category, or search for specific events. You can also create your own events!",
      suggestions: ["How do I create an event?", "How do I RSVP to an event?", "Can I see past events?"],
      link: { text: "Browse Events", url: "/events" }
    },
    create: {
      response: "To create an event, go to the Events section and click 'Create Event'. Fill in the event details, set the date and time, and publish it for the community to see!",
      suggestions: ["What information do I need?", "How do I manage my events?"],
      link: { text: "Create Event", url: "/events/create" }
    },
    rsvp: {
      response: "To RSVP to an event, go to the event page and click the 'RSVP' button. You'll get confirmation and can see other attendees. Don't forget - RSVPing earns you gamification rewards!",
      suggestions: ["Can I cancel my RSVP?", "How do I see who's attending?"]
    }
  },

  // Community
  community: {
    posts: {
      response: "The community forum is where students and alumni share ideas, ask questions, and connect. You can create posts, comment on others' posts, and engage in discussions. It's a great way to build your network!",
      suggestions: ["How do I create a post?", "What should I post about?", "How do I find interesting posts?"],
      link: { text: "Visit Community", url: "/community" }
    },
    connect: {
      response: "To connect with alumni, you can browse profiles, participate in community discussions, attend events, or use the mentorship feature. Many alumni are happy to help students with career advice!",
      suggestions: ["How do I find mentors?", "What should I ask alumni?", "How do I build my network?"],
      link: { text: "Find Mentors", url: "/community" }
    }
  },

  // Jobs
  jobs: {
    find: {
      response: "Check out the Jobs section to find opportunities posted by alumni. You can filter by location, company, or job type. Alumni often post exclusive opportunities for students!",
      suggestions: ["How do I apply for jobs?", "Can I post job opportunities?"],
      link: { text: "Browse Jobs", url: "/jobs" }
    },
    post: {
      response: "Alumni can post job opportunities to help students find great positions. Go to the Jobs section and click 'Post Job' to share opportunities with the community.",
      suggestions: ["What information should I include?", "How do I manage my job posts?"],
      link: { text: "Post Job", url: "/jobs/new" }
    }
  },

  // Navigation
  navigation: {
    dashboard: {
      response: "Your dashboard shows your personalized view of the platform. Students see their progress, upcoming events, and community activity. Alumni see their contributions, mentoring opportunities, and network activity.",
      suggestions: ["What can I do from my dashboard?", "How do I customize my dashboard?"],
      link: { text: "Go to Dashboard", url: "/dashboard" }
    },
    profile: {
      response: "Your profile is where others can learn about you. It shows your achievements, gamification progress, and contact information. Make sure to keep it updated!",
      suggestions: ["How do I make my profile stand out?", "What should I include?"],
      link: { text: "View Profile", url: "/profile" }
    }
  }
};

// Function to find the best response based on user input
function findBestResponse(message: string): ChatbotResponse {
  const lowerMessage = message.toLowerCase();
  
  // Profile related queries
  if (lowerMessage.includes('profile') && (lowerMessage.includes('create') || lowerMessage.includes('make') || lowerMessage.includes('new'))) {
    return knowledgeBase.profile.create;
  }
  if (lowerMessage.includes('profile') && (lowerMessage.includes('edit') || lowerMessage.includes('update') || lowerMessage.includes('change'))) {
    return knowledgeBase.profile.edit;
  }
  
  // Gamification queries
  if (lowerMessage.includes('gamification') || lowerMessage.includes('stars') || lowerMessage.includes('points') || lowerMessage.includes('badges')) {
    if (lowerMessage.includes('star')) {
      return knowledgeBase.gamification.stars;
    }
    if (lowerMessage.includes('point')) {
      return knowledgeBase.gamification.points;
    }
    return knowledgeBase.gamification.general;
  }
  
  // Event queries
  if (lowerMessage.includes('event')) {
    if (lowerMessage.includes('create') || lowerMessage.includes('make') || lowerMessage.includes('new')) {
      return knowledgeBase.events.create;
    }
    if (lowerMessage.includes('rsvp') || lowerMessage.includes('attend') || lowerMessage.includes('join')) {
      return knowledgeBase.events.rsvp;
    }
    return knowledgeBase.events.find;
  }
  
  // Community queries
  if (lowerMessage.includes('community') || lowerMessage.includes('forum') || lowerMessage.includes('post')) {
    if (lowerMessage.includes('connect') || lowerMessage.includes('alumni') || lowerMessage.includes('mentor')) {
      return knowledgeBase.community.connect;
    }
    return knowledgeBase.community.posts;
  }
  
  // Job queries
  if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('opportunity')) {
    if (lowerMessage.includes('post') || lowerMessage.includes('create') || lowerMessage.includes('share')) {
      return knowledgeBase.jobs.post;
    }
    return knowledgeBase.jobs.find;
  }
  
  // Navigation queries
  if (lowerMessage.includes('dashboard')) {
    return knowledgeBase.navigation.dashboard;
  }
  if (lowerMessage.includes('profile') && !lowerMessage.includes('create') && !lowerMessage.includes('edit')) {
    return knowledgeBase.navigation.profile;
  }
  
  // Default responses for common greetings and questions
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      response: "Hello! I'm here to help you navigate AlumniSphere. You can ask me about profiles, events, gamification, community features, or anything else about the platform!",
      suggestions: [
        "How do I create a profile?",
        "What is gamification?",
        "How to find events?",
        "How to connect with alumni?"
      ]
    };
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return {
      response: "I can help you with: 📝 Creating and managing profiles, 🎮 Understanding gamification, 📅 Finding and creating events, 👥 Community features, 💼 Job opportunities, and 🧭 Platform navigation. What would you like to know?",
      suggestions: [
        "Tell me about gamification",
        "How do I find events?",
        "How to connect with alumni?",
        "What can I do on my dashboard?"
      ]
    };
  }
  
  if (lowerMessage.includes('thank')) {
    return {
      response: "You're welcome! I'm always here to help. Feel free to ask me anything else about AlumniSphere!",
      suggestions: [
        "How do I earn more stars/points?",
        "What events are coming up?",
        "How do I update my profile?"
      ]
    };
  }
  
  // Fallback response
  return {
    response: "I'm not sure I understand that question. Could you try rephrasing it? I can help you with profiles, events, gamification, community features, jobs, or general navigation. What would you like to know?",
    suggestions: [
      "How do I create a profile?",
      "What is gamification?",
      "How to find events?",
      "How to connect with alumni?",
      "What can I do on my dashboard?"
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Simulate a small delay for more realistic chat experience
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const response = findBestResponse(message);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
