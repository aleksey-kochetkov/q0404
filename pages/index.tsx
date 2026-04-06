import React, { useState } from 'react';

const Field = () => {
    const [subject, setSubject] = useState('');

    return (
        <div className="flex flex-col">
            <label className="mb-2">Тема заявки </label>
            <input type="text" value={subject}
                onChange={(e) => setSubject(e.target.value)}
                         className="border rounded-md p-2"/>
            <br/>Это пример надписи на странице.
        </div>
    );
};

export default Field;