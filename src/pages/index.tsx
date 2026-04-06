import React, { useState } from 'react';

const Field = () => {
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/submit';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject }),
            });

            if (response.ok) {
                setMessage('✓ Successfully submitted!');
                setSubject('');
            } else {
                setMessage('✗ Failed to submit. Please try again.');
            }
        } catch (error) {
            setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <label className="mb-2 font-georgia">Тема заявки</label>
            <form onSubmit={handleSubmit}>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="border rounded-md p-2 mb-4 w-full" placeholder="тема заявки..." required />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && (
                <p className={`mt-4 ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}> {message} </p>
            )}
        </div>
    );
};

export default Field;