import { getCourses } from "@/actions/course.action";
import { getReviews } from "@/actions/review.action";
import InstructorCourseCard from "@/components/cards/instructor-course.card";
import ReviewCard from "@/components/cards/review.card";
import StatisticsCard from "@/components/cards/statistics.card";
import { formatNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { MessageSquare, MonitorPlay } from "lucide-react";
import { GrMoney } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import Header from "../../../../components/shared/header";

async function Page() {
  const { userId } = auth();
  const result = await getCourses({ clerkId: userId! });
  const { reviews, totalReviews } = await getReviews({ clerkId: userId! });

  return (
    <>
      <Header title="Dashboard" description="Welcome to your dashboard" />

      <div className="mt-4 grid grid-cols-4 gap-4">
        <StatisticsCard
          label="Total courses"
          value={result.totalCourses.toString()}
          Icon={MonitorPlay}
        />
        <StatisticsCard
          label="Total students"
          value={formatNumber(result.totalStudents.toString())}
          Icon={PiStudent}
        />
        <StatisticsCard
          label="Total reviews"
          value={formatNumber(totalReviews)}
          Icon={MessageSquare}
        />
        <StatisticsCard
          label="Total Sales"
          value={result.totalEarnings.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          Icon={GrMoney}
        />
      </div>

      <Header
        title="Latest courses"
        description="Here are your latest courses"
      />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {result.courses.map((course) => (
          <InstructorCourseCard key={course.title} course={course} />
        ))}
      </div>

      <Header title="Reviews" description="Here are your latest reviews" />

      <div className="mt-4 grid grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="rounded-md bg-background px-4 pb-4">
            <ReviewCard review={JSON.parse(JSON.stringify(review))} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
