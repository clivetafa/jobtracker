import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

const JobTable = ({ jobs, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      interview: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4">Company</th>
            <th className="text-left py-3 px-4">Position</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Details</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                    <span className="font-bold">{job.company[0]}</span>
                  </div>
                  <span className="font-medium">{job.company}</span>
                </div>
              </td>
              <td className="py-4 px-4">{job.position}</td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-4">{job.date}</td>
              <td className="py-4 px-4">
                <div>
                  <p>{job.location}</p>
                  <p className="text-sm font-medium">{job.salary}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2">
                  <button onClick={() => onEdit(job)} className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(job.id)} className="p-2 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;