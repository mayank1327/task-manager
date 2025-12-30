import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PriorityBoard = () => {
  const [tasks, setTasks] = useState({ high: [], medium: [], low: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await taskAPI.getTasks(1, 100);
      const allTasks = res.data.tasks;
      
      setTasks({
        high: allTasks.filter(t => t.priority === 'high'),
        medium: allTasks.filter(t => t.priority === 'medium'),
        low: allTasks.filter(t => t.priority === 'low')
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const changePriority = async (taskId, newPriority) => {
    try {
      await taskAPI.updateTask(taskId, { priority: newPriority });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const renderColumn = (priority, label, color, taskList) => (
    <div className="flex-1 min-w-[300px]">
      <div className={`rounded-lg border-2 ${color.border} bg-white`}>
        <div className={`${color.bg} px-4 py-3 border-b-2 ${color.border}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold ${color.text} uppercase tracking-wide`}>
              {label}
            </h3>
            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color.badge}`}>
              {taskList.length}
            </span>
          </div>
        </div>
        
        <div className="p-3 space-y-2 min-h-[400px] max-h-[600px] overflow-y-auto">
          {taskList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm">No tasks</p>
            </div>
          ) : (
            taskList.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(task._id, task.status);
                    }}
                    className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium cursor-pointer hover:text-blue-600 transition ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}` } onClick={() => navigate(`/tasks/${task._id}`)}>
                      {task.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="mr-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {priority !== 'low' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changePriority(task._id, priority === 'high' ? 'medium' : 'low');
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Move down"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </button>
                    )}
                    {priority !== 'high' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changePriority(task._id, priority === 'low' ? 'medium' : 'high');
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                        title="Move up"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const totalTasks = tasks.high.length + tasks.medium.length + tasks.low.length;
  const completedTasks = [...tasks.high, ...tasks.medium, ...tasks.low].filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Priority Board</h1>
          <p className="mt-1 text-sm text-gray-600">
            Organize tasks by priority level • {totalTasks} total • {completedTasks} completed
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
            {renderColumn(
              'high',
              'High Priority',
              {
                border: 'border-red-200',
                bg: 'bg-red-50',
                text: 'text-red-700',
                badge: 'bg-red-100 text-red-700'
              },
              tasks.high
            )}
            {renderColumn(
              'medium',
              'Medium Priority',
              {
                border: 'border-amber-200',
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                badge: 'bg-amber-100 text-amber-700'
              },
              tasks.medium
            )}
            {renderColumn(
              'low',
              'Low Priority',
              {
                border: 'border-emerald-200',
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                badge: 'bg-emerald-100 text-emerald-700'
              },
              tasks.low
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityBoard;