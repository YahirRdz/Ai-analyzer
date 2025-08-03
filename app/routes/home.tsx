 import type { Route } from "./+types/home";
 import Navbar from "~/components/Navbar";
 import {resumes} from "~/routes/constants";
 import {callback} from "fdir/dist/api/async";
 import ResumeCard from "~/components/ResumeCard";
 import {usePuterStore} from "~/lib/puter";
 import {useLocation, useNavigate} from "react-router";
 import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job " },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])



  return <main className="bg-amber-100">
    <Navbar />

    <section className="main-section py-16">
      <div className="page-heading">
        <h1>Track your Applications & Resume Ratings</h1>
        <h2>Review your submitions and check AI-powered feedback</h2>

      </div>
    {resumes.length > 0 && (
    <div className="resumes-section">
    {resumes.map((resume) => (
        <div>
          <ResumeCard key={resume.id} resume={resume} />
        </div>
    ))}
    </div>
    )}
    </section>

  </main>;
}
