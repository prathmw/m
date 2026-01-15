import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Search as SearchIcon,
  Filter,
  Grid,
  List,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

// Mock data - will be replaced with real data from Supabase
const profiles = [
  {
    id: "1",
    name: "Sarah M.",
    age: 28,
    location: "New York, NY",
    profession: "Software Engineer",
    education: "Masters in Computer Science",
    denomination: "Catholic",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Michael R.",
    age: 32,
    location: "Los Angeles, CA",
    profession: "Doctor",
    education: "MD Medicine",
    denomination: "Protestant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Emily J.",
    age: 26,
    location: "Chicago, IL",
    profession: "Teacher",
    education: "Bachelor in Education",
    denomination: "Orthodox",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "David K.",
    age: 30,
    location: "Houston, TX",
    profession: "Architect",
    education: "Masters in Architecture",
    denomination: "Baptist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Rachel T.",
    age: 27,
    location: "Phoenix, AZ",
    profession: "Nurse",
    education: "BSc Nursing",
    denomination: "Methodist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "James P.",
    age: 34,
    location: "Philadelphia, PA",
    profession: "Lawyer",
    education: "JD Law",
    denomination: "Lutheran",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
];

function ProfileCard({ profile, viewMode }: { profile: typeof profiles[0]; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-elegant transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {profile.location}
                  </p>
                </div>
                <Badge variant="secondary">{profile.denomination}</Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {profile.profession}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  {profile.education}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              Interest
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-elegant-lg transition-all duration-300">
      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
          <h3 className="font-display text-xl font-semibold">
            {profile.name}, {profile.age}
          </h3>
          <p className="flex items-center gap-1 text-sm text-background/80">
            <MapPin className="h-3 w-3" />
            {profile.location}
          </p>
        </div>
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          {profile.denomination}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 text-primary" />
          <span>{profile.profession}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>{profile.education}</span>
        </div>
        <Button className="w-full gap-2 mt-2" variant="outline">
          <Heart className="h-4 w-4" />
          Express Interest
        </Button>
      </CardContent>
    </Card>
  );
}

function FilterPanel() {
  const [ageRange, setAgeRange] = useState([21, 40]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
        <Slider
          value={ageRange}
          onValueChange={setAgeRange}
          min={18}
          max={60}
          step={1}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label>Denomination</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any denomination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Denomination</SelectItem>
            <SelectItem value="catholic">Roman Catholic</SelectItem>
            <SelectItem value="protestant">Protestant</SelectItem>
            <SelectItem value="orthodox">Orthodox</SelectItem>
            <SelectItem value="baptist">Baptist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Education</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Education</SelectItem>
            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
            <SelectItem value="masters">Master's Degree</SelectItem>
            <SelectItem value="doctorate">Doctorate / PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input placeholder="City or State" />
      </div>

      <div className="space-y-2">
        <Label>Profession</Label>
        <Input placeholder="Any profession" />
      </div>

      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Clear All
      </Button>
    </div>
  );
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-royal-blue-light to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Your <span className="text-gradient-gold">Match</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse through verified Christian profiles and find your perfect life partner
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or registration number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-4">Filters</h3>
                  <FilterPanel />
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{profiles.length}</span> profiles
                </p>

                <div className="flex items-center gap-2">
                  {/* Mobile Filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Toggle */}
                  <div className="flex items-center border rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profiles Grid/List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {profiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProfileCard profile={profile} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              <div className="text-center mt-10">
                <Button variant="outline" size="lg">
                  Load More Profiles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Search;
