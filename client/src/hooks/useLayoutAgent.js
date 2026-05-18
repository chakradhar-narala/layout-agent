import { useState } from 'react';
import axios from 'axios';
import initialLayout from '../data/initialLayout.json';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newUserMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/chat' 
        : 'http://localhost:3001/api/chat';

      const { data } = await axios.post(apiUrl, {
        message: text,
        layout,
        history: messages.slice(-6) // limit context history to last 6 messages
      });

      if (data.updatedLayout) {
        setLayout(data.updatedLayout);
      }
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.explanation || 'Done!' }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error communicating with the backend API.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { layout, messages, loading, sendMessage };
}
