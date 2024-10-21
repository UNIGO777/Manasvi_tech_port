import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import logo from '../imgvid/logo.png';

const AdminDashboard = lazy(() => import("./pages/dashboard"));
const AdminProjects = lazy(() => import("./pages/projects"));
const AdminCategories = lazy(() => import("./pages/categories"));
const AddNewProject = lazy(() => import("./pages/addNewProduct"));
const UpdateProject = lazy(() => import("./pages/updateProject"));

const AdminPanel = () => {
  const [Projects, setProjects] = useState([]);
  const location = useLocation();
  const [updateProject, setupdateProject] = useState();
  const token = document?.cookie?.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; SameSite=Strict; Secure';
    window.location.href = '/admin/login';
  };
  
  

  useEffect(() => {
    axios.get("/api/projects")
      .then(response => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch(error => {
        alert("Error fetching projects:", error);
        console.error("Error fetching projects:", error);
      });
  }, []);

  const path = location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center flex-shrink-0">
                <Link to="/">
                  <img
                    className="w-16"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  to="/admin"
                  className={` text-gray-900 inline-flex items-center px-1 pt-1 transition-all ${
                    path === "/admin" && "border-b-2 text-indigo-600 border-indigo-600"
                  }  text-sm font-medium transition-all  hover:text-indigo-600 `}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/projects"
                  className={` text-gray-500  inline-flex items-center px-1 pt-1   text-sm font-medium transition-all duration-300 ${
                    path === "/admin/projects" && "border-b-2 text-indigo-600 border-indigo-600"
                  }`}
                >
                  Projects
                </Link>
                {/* <Link
                  to="/admin/categories"
                  className={`border-transparent text-gray-500 inline-flex items-center px-1 pt-1  ${
                    path === "/admin/categories" && "border-b-2 text-indigo-600 border-indigo-600"
                  } text-sm font-medium transition-all d`}
                >
                  Categories
                </Link> */}
              </div>
            </div>
            
            <div className="flex items-center p-2">
                <button className="px-4 py-2 ml-10 text-white bg-black rounded-md hover:bg-gray-800" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {path === "/admin" && (
          <AdminDashboard Projects={Projects} />
        )}
        {path === '/admin/projects' && <AdminProjects Projects={Projects} setUpdateProject={setupdateProject} />}
        {/* {path === '/admin/categories' && <AdminCategories subSubCategories={subSubCategories} categories={categories} subCategories={subCategories} />} */}
        {path === '/admin/add-new-project' && <AddNewProject />}
        {path === `/admin/update-project` && <UpdateProject UpdateProject={updateProject} />}
      </Suspense>
    </div>
  );
};

export default AdminPanel;
