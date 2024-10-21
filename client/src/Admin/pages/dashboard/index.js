import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { useEffect } from "react";

const AdminDashboard = ({ Projects }) => {
  
  return (
    <div className="max-w-7xl mx-auto px-3 py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Admin Dashboard
      </h1>
      <div className="grid   gap-10">
        <div className="bg-background overflow-hidden shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
          <div className="px-8 py-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">
              Manage Projects
            </h2>
            <p className="mb-3">
              Projects are the creative works showcased in your portfolio.
              Manage your project collection, add new projects, or update
              existing ones to reflect your latest achievements.
            </p>
            <p className="mb-10">
              You can add new Projects, update existing ones, or delete them.
            </p>
            <p className="mb-4 uppercase font-semibold">
              total projects :{" "}
              <span className="font bold">{Projects?.length}</span>
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/admin/add-new-project"
                className="w-full sm:w-auto inline-flex bg-primary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
              >
                Add Project
              </Link>
              <Link
                to="/admin/projects"
                className="w-full sm:w-auto inline-flex bg-secondary items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
