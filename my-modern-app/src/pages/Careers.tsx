import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernLayout from '../components/layout/Layout';

// Types for job listings
interface JobPosting {
    id: string;
    title: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    department: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits?: string[];
    postedDate: string;
    isRemote?: boolean;
    linkedInUrl?: string;
}

interface Department {
    id: string;
    name: string;
    count: number;
}

const Careers = () => {
    // State for job listings, job detail view, filters and application form
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
    const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [isOpenApplication, setIsOpenApplication] = useState(false);
    const [activeLocation, setActiveLocation] = useState<string>('all');
    const [activeDepartment, setActiveDepartment] = useState<string>('all');
    const [activeType, setActiveType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [jobTypes, setJobTypes] = useState<string[]>([]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    // Form data state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedInUrl: '',
        coverLetter: '',
        resume: null as File | null,
        jobId: ''
    });

    // Form errors state
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Fetch job postings (simulate API call)
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setJobs(jobListings);
            setFilteredJobs(jobListings);

            // Extract unique departments for filtering
            const depts = jobListings.reduce((acc: Department[], job) => {
                const existing = acc.find(d => d.name === job.department);
                if (existing) {
                    existing.count++;
                } else {
                    acc.push({ id: job.department.toLowerCase().replace(/\s+/g, '-'), name: job.department, count: 1 });
                }
                return acc;
            }, []);
            setDepartments(depts);

            // Extract unique locations
            const locs = [...new Set(jobListings.map(job => job.location))];
            setLocations(locs);

            // Extract unique job types
            const types = [...new Set(jobListings.map(job => job.type))];
            setJobTypes(types);

            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Handle filtering
    useEffect(() => {
        let result = [...jobs];

        // Apply location filter
        if (activeLocation !== 'all') {
            result = result.filter(job => job.location === activeLocation);
        }

        // Apply department filter
        if (activeDepartment !== 'all') {
            result = result.filter(job => job.department.toLowerCase().replace(/\s+/g, '-') === activeDepartment);
        }

        // Apply job type filter
        if (activeType !== 'all') {
            result = result.filter(job => job.type === activeType);
        }

        // Apply search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                job =>
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.department.toLowerCase().includes(query)
            );
        }

        setFilteredJobs(result);
    }, [activeLocation, activeDepartment, activeType, searchQuery, jobs]);

    // Format date nicely
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days ago
    const getDaysAgo = (dateString: string) => {
        const postedDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - postedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    };

    // Handle form changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files?.[0] || null }));

            // Clear error
            if (formErrors.resume) {
                setFormErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.resume;
                    return newErrors;
                });
            }
        }
    };

    // Validate form
    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.resume) errors.resume = 'Resume is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate form submission
            console.log('Form submitted:', formData);

            // Show success message
            alert('Your application has been submitted successfully!');

            // Close form and reset
            setShowApplicationForm(false);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                linkedInUrl: '',
                coverLetter: '',
                resume: null,
                jobId: ''
            });
        }
    };

    // Open application form for specific job
    const openApplicationForm = (job: JobPosting) => {
        setFormData(prev => ({ ...prev, jobId: job.id }));
        setIsOpenApplication(false);
        setSelectedJob(job);
        setShowApplicationForm(true);
    };

    // Open spontaneous application form
    const openSpontaneousForm = () => {
        setFormData(prev => ({ ...prev, jobId: '' }));
        setIsOpenApplication(true);
        setSelectedJob(null);
        setShowApplicationForm(true);
    };

    // Job Card Component
    const JobCard = ({ job }: { job: JobPosting }) => {
        return (
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-xl border border-gray-100"
            >
                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                                job.type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                                    job.type === 'contract' ? 'bg-purple-100 text-purple-800' :
                                        'bg-green-100 text-green-800'
                            }`}>
                            {job.type.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{getDaysAgo(job.postedDate)}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 font-montserrat">{job.title}</h3>

                    <div className="mb-4 flex items-center text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                        {job.isRemote && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Remote
                            </span>
                        )}
                    </div>

                    <div className="mb-4 flex items-center text-gray-600 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{job.department}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                        {job.description}
                    </p>

                    <div className="mt-auto flex justify-between items-center">
                        <button
                            onClick={() => setSelectedJob(job)}
                            className="inline-flex items-center text-primary font-medium hover:text-primary-dark"
                        >
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button
                            onClick={() => openApplicationForm(job)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    // Job Detail Component
    const JobDetail = ({ job, onClose, onApply }: { job: JobPosting, onClose: () => void, onApply: (job: JobPosting) => void }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
                <div className="relative p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold font-montserrat mb-2 sm:mb-0">{job.title}</h1>
                        <span className={`self-start sm:self-center inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.type === 'full-time' ? 'bg-blue-100 text-blue-800' :
                                job.type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                                    job.type === 'contract' ? 'bg-purple-100 text-purple-800' :
                                        'bg-green-100 text-green-800'
                            }`}>
                            {job.type.replace('-', ' ')}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 gap-4 mb-8">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.location}</span>
                            {job.isRemote && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Remote
                                </span>
                            )}
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{job.department}</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Posted {formatDate(job.postedDate)}</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p>{job.description}</p>

                        <h3 className="text-xl font-bold mt-8 mb-4">Responsibilities</h3>
                        <ul className="space-y-2">
                            {job.responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold mt-8 mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            {job.requirements.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {job.benefits && (
                            <>
                                <h3 className="text-xl font-bold mt-8 mb-4">Benefits</h3>
                                <ul className="space-y-2">
                                    {job.benefits.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
                        <button
                            onClick={() => onApply(job)}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Apply Now
                        </button>

                        {job.linkedInUrl && (
                            <a
                                href={job.linkedInUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Apply via LinkedIn
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    // Application Form Component
    const ApplicationForm = ({
        job,
        isOpenApplication,
        onClose
    }: {
        job: JobPosting | null,
        isOpenApplication: boolean,
        onClose: () => void
    }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
                <div className="relative p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h1 className="text-2xl md:text-3xl font-bold font-montserrat mb-6">
                        {isOpenApplication ? 'Spontaneous Application' : `Apply for ${job?.title}`}
                    </h1>

                    {isOpenApplication && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <p className="text-blue-800">
                                No open positions that match your skills? Submit a spontaneous application and we'll
                                contact you when relevant opportunities arise.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                />
                                {formErrors.firstName && (
                                    <p className="mt-2 text-sm text-red-600">{formErrors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                />
                                {formErrors.lastName && (
                                    <p className="mt-2 text-sm text-red-600">{formErrors.lastName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
                                />
                                {formErrors.email && (
                                    <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        {/* LinkedIn URL */}
                        <div>
                            <label htmlFor="linkedInUrl" className="block text-sm font-medium text-gray-700">
                                LinkedIn Profile URL
                            </label>
                            <input
                                type="url"
                                id="linkedInUrl"
                                name="linkedInUrl"
                                value={formData.linkedInUrl}
                                onChange={handleFormChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="https://www.linkedin.com/in/yourprofile"
                            />
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                                Cover Letter
                            </label>
                            <textarea
                                id="coverLetter"
                                name="coverLetter"
                                rows={6}
                                value={formData.coverLetter}
                                onChange={handleFormChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Tell us why you're interested in working with us..."
                            />
                        </div>
                        {/* Resume Upload */}
                        <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                                Resume/CV *
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                    {formData.resume && (
                                        <p className="text-sm text-green-600 mt-2">
                                            Selected file: {formData.resume.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {formErrors.resume && (
                                <p className="mt-2 text-sm text-red-600">{formErrors.resume}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        );
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(index => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="p-6">
                        <div className="flex justify-between">
                            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 bg-gray-300 rounded animate-pulse mt-4 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
                        <div className="flex justify-between mt-4">
                            <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <ModernLayout title="Join Our Team">
            <div className="min-h-screen">
                {showApplicationForm ? (
                    // Application Form
                    <section className="py-10">
                        <div className="container mx-auto px-4">
                            <ApplicationForm
                                job={selectedJob}
                                isOpenApplication={isOpenApplication}
                                onClose={() => setShowApplicationForm(false)}
                            />
                        </div>
                    </section>
                ) : selectedJob ? (
                    // Job Detail View
                    <section className="py-10">
                        <div className="container mx-auto px-4">
                            <JobDetail
                                job={selectedJob}
                                onClose={() => setSelectedJob(null)}
                                onApply={openApplicationForm}
                            />
                        </div>
                    </section>
                ) : (
                    // Jobs Listing View
                    <>
                        {/* Hero Section */}
                        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                                </svg>
                            </div>

                            <div className="container mx-auto px-4 relative z-10">
                                <div className="max-w-3xl">
                                    <motion.h2
                                        className="text-3xl md:text-4xl font-bold mb-6 font-montserrat"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        Join Our Team of Innovators
                                    </motion.h2>
                                    <motion.p
                                        className="text-xl text-white/90 mb-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                    >
                                        At BridgePoint, we're passionate about engineering and testing excellence.
                                        Join us as we develop the next generation of testing solutions that help our
                                        clients succeed in a rapidly evolving technological landscape.
                                    </motion.p>
                                    <motion.button
                                        onClick={openSpontaneousForm}
                                        className="px-6 py-3 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Submit Spontaneous Application
                                    </motion.button>
                                </div>
                            </div>
                        </section>

                        {/* Why Join Us Section */}
                        <section className="py-16 bg-white">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4 font-montserrat">Why Join BridgePoint?</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        We believe in creating an environment where innovation thrives and everyone can grow professionally
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {/* Card 1 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6 text-center"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 font-montserrat">Innovation</h3>
                                        <p className="text-gray-600">
                                            Work on cutting-edge technologies and solve complex engineering challenges
                                        </p>
                                    </motion.div>

                                    {/* Card 2 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6 text-center"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.775-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 font-montserrat">Learning</h3>
                                        <p className="text-gray-600">
                                            Continuous learning opportunities and professional development programs
                                        </p>
                                    </motion.div>

                                    {/* Card 3 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6 text-center"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 font-montserrat">Team Spirit</h3>
                                        <p className="text-gray-600">
                                            Collaborative environment where every team member's contribution is valued
                                        </p>
                                    </motion.div>

                                    {/* Card 4 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6 text-center"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5V10m0 4.5v4.5m-1.5-8l3-3-3-3" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 font-montserrat">Work-Life Balance</h3>
                                        <p className="text-gray-600">
                                            Flexible working arrangements and a focus on wellbeing
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* Open Positions Section */}
                        <section className="py-16 bg-gray-50">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4 font-montserrat">Open Positions</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Explore our current openings and find where your skills fit best
                                    </p>
                                </div>

                                {/* Filters and Search */}
                                <div className="mb-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                        {/* Filters Title */}
                                        <h3 className="text-lg font-medium mb-4 md:mb-0">Filter By:</h3>

                                        {/* Search */}
                                        <div className="w-full md:w-auto relative">
                                            <input
                                                type="text"
                                                placeholder="Search positions..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                            />
                                            <div className="absolute left-3 top-2.5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Department Filter */}
                                        <div>
                                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                                Department
                                            </label>
                                            <select
                                                id="department"
                                                value={activeDepartment}
                                                onChange={(e) => setActiveDepartment(e.target.value)}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                                            >
                                                <option value="all">All Departments</option>
                                                {departments.map((dept) => (
                                                    <option key={dept.id} value={dept.id}>
                                                        {dept.name} ({dept.count})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Location Filter */}
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                                Location
                                            </label>
                                            <select
                                                id="location"
                                                value={activeLocation}
                                                onChange={(e) => setActiveLocation(e.target.value)}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                                            >
                                                <option value="all">All Locations</option>
                                                {locations.map((location) => (
                                                    <option key={location} value={location}>
                                                        {location}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Job Type Filter */}
                                        <div>
                                            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Type
                                            </label>
                                            <select
                                                id="jobType"
                                                value={activeType}
                                                onChange={(e) => setActiveType(e.target.value)}
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                                            >
                                                <option value="all">All Types</option>
                                                {jobTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type.replace('-', ' ')}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Jobs Grid */}
                                {isLoading ? (
                                    <LoadingSkeleton />
                                ) : filteredJobs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {filteredJobs.map((job, index) => (
                                            <motion.div
                                                key={job.id}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                                variants={fadeInUp}
                                            >
                                                <JobCard job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-lg shadow">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-gray-600 mb-2">No Positions Found</h3>
                                        <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                                        <button
                                            onClick={openSpontaneousForm}
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Submit Spontaneous Application
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Employee Testimonials */}
                        <section className="py-16 bg-white">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold mb-4 font-montserrat">Life at BridgePoint</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Hear from our team members about their experiences working with us
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Testimonial 1 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                            <div>
                                                <h4 className="font-bold">Ana Silva</h4>
                                                <p className="text-sm text-gray-600">Software Engineer</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 italic">
                                            "Working at BridgePoint has been an amazing opportunity to grow professionally.
                                            The challenging projects and supportive team environment have helped me develop
                                            new skills and advance my career."
                                        </p>
                                    </motion.div>

                                    {/* Testimonial 2 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                            <div>
                                                <h4 className="font-bold">Miguel Torres</h4>
                                                <p className="text-sm text-gray-600">Test Systems Engineer</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 italic">
                                            "The culture of innovation at BridgePoint is what sets it apart. We're
                                            encouraged to think creatively and find new solutions to complex problems,
                                            which makes each day exciting and rewarding."
                                        </p>
                                    </motion.div>

                                    {/* Testimonial 3 */}
                                    <motion.div
                                        className="bg-gray-50 rounded-lg p-6"
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        variants={fadeInUp}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                            <div>
                                                <h4 className="font-bold">Sofia Martins</h4>
                                                <p className="text-sm text-gray-600">Project Manager</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 italic">
                                            "What I appreciate most about BridgePoint is the work-life balance. The flexible
                                            schedule allows me to be productive at work while still having time for my
                                            personal life and family commitments."
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* LinkedIn Integration CTA */}
                        <section className="py-16 bg-primary text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid-cta" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid-cta)"></rect>
                                </svg>
                            </div>

                            <div className="container mx-auto px-4 relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="mb-6 md:mb-0 md:mr-8">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-montserrat">Follow Us on LinkedIn</h2>
                                        <p className="text-white/80 max-w-xl">
                                            Stay updated on our latest job openings, company news, and industry insights
                                            by following BridgePoint on LinkedIn.
                                        </p>
                                    </div>
                                    <a
                                        href="https://pt.linkedin.com/company/bridgepoint-test-systems"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-primary px-6 py-3 rounded-full font-bold flex items-center transition-transform hover:scale-105"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        Follow on LinkedIn
                                    </a>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </ModernLayout>
    );
};

// Sample job listings data
const jobListings: JobPosting[] = [
    {
        id: 'job1',
        title: 'Software Engineer - Test Systems',
        location: 'Évora, Portugal',
        type: 'full-time',
        department: 'Engineering',
        postedDate: '2024-03-01',
        isRemote: false,
        description: 'We are looking for a Software Engineer to join our Test Systems development team. The ideal candidate will have experience in developing software for automated test systems and a passion for creating robust, efficient solutions.',
        responsibilities: [
            'Design and develop software for automated test systems',
            'Work with cross-functional teams to understand testing requirements',
            'Create and maintain documentation for test systems',
            'Troubleshoot and debug issues in existing test systems',
            'Optimize test processes for efficiency and reliability',
            'Stay current with emerging technologies and methodologies'
        ],
        requirements: [
            'Bachelor\'s degree in Computer Science, Software Engineering, or related field',
            '3+ years of experience in software development',
            'Proficiency in LabVIEW, Python, or C#',
            'Experience with test automation frameworks and tools',
            'Knowledge of instrument control and data acquisition systems',
            'Strong problem-solving and analytical skills',
            'Excellent communication and teamwork abilities'
        ],
        benefits: [
            'Competitive salary and bonus structure',
            'Health insurance',
            'Flexible working hours',
            'Continuous professional development opportunities',
            'Regular team events and activities'
        ],
        linkedInUrl: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/'
    },
    {
        id: 'job2',
        title: 'Hardware Engineer',
        location: 'São João da Talha, Portugal',
        type: 'full-time',
        department: 'Engineering',
        postedDate: '2024-02-15',
        isRemote: false,
        description: 'BridgePoint is seeking a talented Hardware Engineer to design and develop electronic hardware for our test systems. This role involves working on challenging projects in the automotive and electronics industries.',
        responsibilities: [
            'Design and develop electronic circuits and PCBs for test systems',
            'Create and review hardware documentation and specifications',
            'Work with software engineers to integrate hardware and software components',
            'Troubleshoot and resolve hardware issues',
            'Research and evaluate new technologies and components',
            'Support manufacturing and field service teams'
        ],
        requirements: [
            'Bachelor\'s or Master\'s degree in Electrical Engineering or related field',
            '2+ years of experience in hardware design',
            'Proficiency in PCB design software (Altium Designer preferred)',
            'Experience with analog and digital circuit design',
            'Knowledge of communication protocols (CAN, LIN, I2C, etc.)',
            'Familiarity with microcontrollers and embedded systems',
            'Good problem-solving and teamwork skills'
        ],
        benefits: [
            'Competitive salary package',
            'Health and dental insurance',
            'Professional development budget',
            'Flexible working arrangements',
            'Employee recognition program'
        ]
    },
    {
        id: 'job3',
        title: 'Project Manager',
        location: 'Évora, Portugal',
        type: 'full-time',
        department: 'Project Management',
        postedDate: '2024-02-28',
        isRemote: true,
        description: 'We are looking for an experienced Project Manager to lead our test system development projects. The ideal candidate will have a strong technical background and excellent leadership skills.',
        responsibilities: [
            'Manage full lifecycle of test systems projects from conception to delivery',
            'Develop project plans, timelines, and budgets',
            'Coordinate cross-functional teams to achieve project goals',
            'Monitor project progress and address any issues or delays',
            'Communicate with clients and stakeholders regularly',
            'Ensure projects meet quality standards and client requirements',
            'Document project activities, decisions, and outcomes'
        ],
        requirements: [
            'Bachelor\'s degree in Engineering, Computer Science, or related field',
            '5+ years of experience in project management, preferably in technical environments',
            'PMP certification or equivalent',
            'Strong understanding of test systems and automation',
            'Excellent leadership, communication, and negotiation skills',
            'Experience with project management tools and methodologies',
            'Ability to manage multiple projects simultaneously'
        ],
        benefits: [
            'Competitive salary and performance bonuses',
            'Comprehensive health benefits',
            'Remote work options',
            'Professional development opportunities',
            'Collaborative work environment'
        ],
        linkedInUrl: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/'
    },
    {
        id: 'job4',
        title: 'Quality Assurance Engineer',
        location: 'Monção, Portugal',
        type: 'full-time',
        department: 'Quality',
        postedDate: '2024-03-10',
        isRemote: false,
        description: 'BridgePoint is seeking a Quality Assurance Engineer to ensure our test systems meet the highest quality standards. This role involves developing and implementing quality processes and conducting thorough testing.',
        responsibilities: [
            'Develop and implement quality assurance processes for test systems',
            'Create comprehensive test plans and procedures',
            'Perform system testing and validation',
            'Document and track quality issues and their resolution',
            'Collaborate with engineering teams to improve product quality',
            'Stay current with quality standards and best practices',
            'Prepare quality reports for management and clients'
        ],
        requirements: [
            'Bachelor\'s degree in Engineering, Computer Science, or related field',
            '3+ years of experience in quality assurance, preferably in test systems',
            'Knowledge of quality standards (ISO 9001, automotive standards)',
            'Experience with testing methodologies and tools',
            'Strong attention to detail and analytical skills',
            'Excellent documentation and communication abilities',
            'Problem-solving mindset'
        ],
        benefits: [
            'Competitive compensation package',
            'Health and wellness benefits',
            'Flexible schedule',
            'Training and certification support',
            'Team building activities and events'
        ]
    },
    {
        id: 'job5',
        title: 'Sales Engineer',
        location: 'Évora, Portugal',
        type: 'full-time',
        department: 'Sales',
        postedDate: '2024-03-05',
        isRemote: true,
        description: 'We are looking for a Sales Engineer to promote our test system solutions to clients in the automotive and electronics industries. The ideal candidate will have both technical knowledge and sales skills.',
        responsibilities: [
            'Identify and develop new business opportunities',
            'Present technical solutions to potential clients',
            'Work with engineering teams to develop customized solutions',
            'Prepare and deliver sales presentations and proposals',
            'Respond to technical queries from clients',
            'Maintain relationships with existing clients',
            'Stay current with industry trends and competitor offerings'
        ],
        requirements: [
            'Bachelor\'s degree in Engineering or related technical field',
            '3+ years of experience in technical sales, preferably in test systems',
            'Strong understanding of test automation and measurement systems',
            'Excellent presentation and communication skills',
            'Ability to understand client needs and propose appropriate solutions',
            'Willingness to travel (30-40%)',
            'Results-oriented mindset'
        ],
        benefits: [
            'Competitive base salary plus commission structure',
            'Company car or car allowance',
            'Comprehensive health benefits',
            'Remote work flexibility',
            'Ongoing training and development'
        ],
        linkedInUrl: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/'
    },
    {
        id: 'job6',
        title: 'Test Systems Technician',
        location: 'São João da Talha, Portugal',
        type: 'full-time',
        department: 'Operations',
        postedDate: '2024-02-20',
        isRemote: false,
        description: 'BridgePoint is seeking a Test Systems Technician to assist in the assembly, installation, and maintenance of our test systems. This hands-on role is ideal for someone with technical skills and attention to detail.',
        responsibilities: [
            'Assemble and install test system hardware components',
            'Perform calibration and maintenance on test equipment',
            'Troubleshoot and repair hardware issues',
            'Assist engineers in system testing and validation',
            'Maintain inventory of parts and supplies',
            'Document procedures and maintain technical records',
            'Support field service activities when required'
        ],
        requirements: [
            'Associate degree in Electronics, Engineering Technology, or equivalent experience',
            '2+ years of experience in electronics assembly or technical support',
            'Knowledge of basic electronic principles and measurements',
            'Experience with hand tools and electronic test equipment',
            'Ability to read and understand technical drawings and schematics',
            'Good problem-solving skills and attention to detail',
            'Valid driver\'s license'
        ],
        benefits: [
            'Competitive hourly rate with overtime opportunities',
            'Health insurance coverage',
            'Technical training programs',
            'Career advancement paths',
            'Employee discount programs'
        ]
    },
    {
        id: 'job7',
        title: 'Software Developer Intern',
        location: 'Évora, Portugal',
        type: 'internship',
        department: 'Engineering',
        postedDate: '2024-03-15',
        isRemote: false,
        description: 'We are offering an internship opportunity for a software developer to gain hands-on experience in test systems software development. This is a great opportunity for students or recent graduates to apply their skills in a real-world environment.',
        responsibilities: [
            'Assist in developing software components for test systems',
            'Participate in code reviews and testing activities',
            'Learn about test automation frameworks and tools',
            'Help maintain documentation and technical records',
            'Support senior developers in daily tasks',
            'Contribute to internal projects and initiatives',
            'Present findings and progress in team meetings'
        ],
        requirements: [
            'Currently pursuing or recently completed a degree in Computer Science or related field',
            'Knowledge of programming languages (Python, C#, or LabVIEW)',
            'Basic understanding of software development principles',
            'Eagerness to learn and apply new technologies',
            'Good problem-solving skills',
            'Ability to work in a team environment',
            'Strong communication skills'
        ],
        benefits: [
            'Competitive internship stipend',
            'Structured mentorship program',
            'Flexible working hours',
            'Possibility of full-time employment after internship',
            'Networking opportunities with industry professionals'
        ]
    }
];

export default Careers;