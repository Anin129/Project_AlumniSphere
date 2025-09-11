## Gamification System

This document describes stars (students), points and badges (alumni), event awards, and daily streaks.

### Core Principles

- Students earn stars only. Alumni earn badges and points.
- Actions in the app generate awards through a centralized event log.
- Daily streaks apply to both students and alumni and unlock student stars and alumni badges.

### Entities

- Students: tracked with `totalStars`, `dailyLoginStreak`, `longestStreak`, `level`.
- Alumni: tracked with `badges[]`, `totalBadges`, `totalPoints`, `dailyLoginStreak`, `longestStreak`, `level`.
- Centralized models (in `src/models/gamificationModel.js`):
  - `GamificationEvent`: immutable log of awards for each action.
  - `DailyStreak`: consolidated streak tracking per user.
  - `BadgeCatalog`: list of alumni badge definitions and thresholds.

### Default Awards per Event

Use `getAwardsForEvent({ userType, eventType, quantity })` to compute default awards.

- Students (stars):
  - login: 1 star
  - post_created: 3 stars
  - comment_created: 1 star
  - discussion_created: 2 stars
  - upvote_received: 0 stars (no award by default)
  - answer_accepted: 5 stars

- Alumni (points):
  - login: 0 points (streak affects badges instead)
  - post_created: 1 point
  - comment_created: 0 points
  - discussion_created: 1 point
  - upvote_received: 1 point
  - answer_accepted: 2 points

You can multiply by `quantity` to batch-award for bulk actions.

### Daily Streaks

- Streak increments when a user performs a tracked activity on consecutive days (e.g., login).
- Break in activity resets current streak to 1 on the next active day.
- Longest streak updates when a new maximum is reached.

Student streak rewards (on login):
- Base: 1 star/day
- 7+ day streak: 2 stars/day
- 30+ day streak: 3 stars/day
- 100+ day streak: 5 stars/day

Alumni streak badges (examples):
- 7 days: "Week Warrior"
- 30 days: "Monthly Master"
- 100 days: "Century Champion"

### Levels

- Students: `level = floor(totalStars / 50) + 1`.
- Alumni: `level = floor(totalPoints / 10) + 1`.

### Alumni Badge Catalog (Examples)

Stored in `BadgeCatalog` and referenced when checking eligibility.

- Streak badges:
  - Week Warrior: criteria { type: streak, threshold: 7 }
  - Monthly Master: { streak, 30 }
  - Century Champion: { streak, 100 }

- Achievement badges:
  - Bronze Badge: { points, 5 }
  - Silver Badge: { points, 20 }
  - Gold Badge: { points, 50 }

- Mentoring badges:
  - First Mentor: { mentoring, 1 }
  - Mentor Master: { mentoring, 5 }
  - Mentoring Legend: { mentoring, 20 }

- Contribution badges:
  - First Referral: { referrals, 1 }
  - Community Contributor: { communityPosts, 5 }

### Integration Guide

1) On user actions (post/comment/discussion/upvote/answer), call `getAwardsForEvent(...)` and:
   - Students: add stars to `Student.totalStars` and log `GamificationEvent` with `starsAwarded`.
   - Alumni: add points to `Alumni.totalPoints`, recalc `level`, check badges, and log `GamificationEvent` with `pointsAwarded`.

2) On login/day activity:
   - Update `DailyStreak` and respective user model streak fields.
   - For students: award stars based on current streak.
   - For alumni: evaluate streak badges.

3) Always create a `GamificationEvent` to maintain an audit trail.

### Notes

- Students do not get badges; they only earn stars and levels.
- Alumni can receive badges; points primarily come from engagements and contributions.
- You can tune thresholds and awards by updating `getAwardsForEvent` and `BadgeCatalog`.


