'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Sparkles, Heart, ArrowRight, Calendar, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-xl p-8 border border-purple-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Willkommen zurück! 👋
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Dein persönlicher Raum für Wachstum, Lernen und Community. Entdecke Workshops,
              vernetze dich mit Mentoren und erreiche deine Ziele.
            </p>
          </div>
          <Link href="/dashboard/mentoring">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 whitespace-nowrap">
              <Sparkles className="mr-2 h-4 w-4" />
              My Mentoring Program
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/mentoring" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-purple-100 group-hover:border-purple-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <CardTitle className="mt-4">Create Your Mentoring</CardTitle>
              <CardDescription>
                Get AI-powered mentor matches and personalized recommendations
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/workshops" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-blue-100 group-hover:border-blue-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <CardTitle className="mt-4">Browse Workshops</CardTitle>
              <CardDescription>
                Discover workshops and events tailored to your interests
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/workshops" className="group">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-green-100 group-hover:border-green-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-green-600" />
                <ArrowRight className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <CardTitle className="mt-4">Explore Community</CardTitle>
              <CardDescription>
                Connect with other students and join our vibrant community
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Getting Started Section */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Target className="mr-2 h-6 w-6 text-purple-600" />
            Get Started with Building Bridges
          </CardTitle>
          <CardDescription>
            Complete these steps to make the most of your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Create Your Mentoring Program</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Complete the onboarding questionnaire to get AI-powered mentor matches and personalized recommendations.
                </p>
                <Link href="/dashboard/mentoring">
                  <Button variant="outline" size="sm">
                    Start Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Explore Available Workshops</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Browse our curated selection of workshops designed to empower Girls and FLINTA* of Colour.
                </p>
                <Link href="/dashboard/workshops">
                  <Button variant="outline" size="sm">
                    View Workshops <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Complete Your Profile</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Add more information about yourself to help us provide better recommendations.
                </p>
                <Link href="/dashboard/personal">
                  <Button variant="outline" size="sm">
                    Edit Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Building Bridges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-purple-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Building Bridges empowers Girls and FLINTA* of Colour through mentorship,
              education, and community support. We create safe spaces for growth, learning,
              and connection.
            </p>
            <Link href="/vision">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 p-0">
                Learn more about our vision <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              What You Can Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Connect with experienced mentors in your field of interest</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Attend workshops on career development, self-care, and more</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Access scholarships and resources for your educational journey</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Join a supportive community of like-minded individuals</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 