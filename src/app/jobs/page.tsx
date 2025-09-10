// // app/page.tsx
// import JobCards from '@/components/jobcards';
// // or if not using path mapping:
// // import JobCards from '../components/JobCards';

// export default function Home() {
//   return (
//     <main>
//       <JobCards />
//     </main>
//   );
// }

import JobPostingForm from "@/components/JobPostingForm";

export default function PostJobPage() {
  return <JobPostingForm />;
}
