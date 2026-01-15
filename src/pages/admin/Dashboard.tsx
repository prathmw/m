import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, MessageSquare, Clock, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalProfiles: number;
  pendingProfiles: number;
  approvedProfiles: number;
  rejectedProfiles: number;
  totalEnquiries: number;
  newEnquiries: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProfiles: 0,
    pendingProfiles: 0,
    approvedProfiles: 0,
    rejectedProfiles: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch profile counts
        const { count: totalProfiles } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        const { count: pendingProfiles } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        const { count: approvedProfiles } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved");

        const { count: rejectedProfiles } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "rejected");

        // Fetch enquiry counts
        const { count: totalEnquiries } = await supabase
          .from("contact_enquiries")
          .select("*", { count: "exact", head: true });

        const { count: newEnquiries } = await supabase
          .from("contact_enquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "new");

        setStats({
          totalProfiles: totalProfiles || 0,
          pendingProfiles: pendingProfiles || 0,
          approvedProfiles: approvedProfiles || 0,
          rejectedProfiles: rejectedProfiles || 0,
          totalEnquiries: totalEnquiries || 0,
          newEnquiries: newEnquiries || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Profiles",
      value: stats.totalProfiles,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Approval",
      value: stats.pendingProfiles,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Approved",
      value: stats.approvedProfiles,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Rejected",
      value: stats.rejectedProfiles,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Enquiries",
      value: stats.totalEnquiries,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "New Enquiries",
      value: stats.newEnquiries,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? (
                  <div className="h-9 w-16 bg-muted animate-pulse rounded" />
                ) : (
                  stat.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
