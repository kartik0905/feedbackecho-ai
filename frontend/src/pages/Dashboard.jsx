import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Loader, Modal, Toast } from "../components/ui";
import { api } from "../lib/api";

const emptyReview = { title: "", description: "", badge: "Neutral", author: "" };
const badgeClasses = {
  Positive: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  Negative: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  Neutral: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyReview);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, variant = "success") => {
    setToast({ message, variant });
    window.setTimeout(() => setToast(null), 3500);
  }, []);
  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api("/reviews");
      setReviews(result.data || []);
    } catch (error) {
      notify(error.message, "error");
      if (!localStorage.getItem("token")) navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate, notify]);

  useEffect(() => {
    const requestId = window.setTimeout(() => { void loadReviews(); }, 0);
    return () => window.clearTimeout(requestId);
  }, [loadReviews]);

  const saveReview = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return notify("Title and review text are required.", "error");
    setSaving(true);
    try {
      const payload = { ...form, title: form.title.trim(), description: form.description.trim(), author: form.author.trim() || undefined };
      const result = editing
        ? await api(`/reviews/${editing._id}`, { method: "PUT", body: JSON.stringify(payload) })
        : await api("/reviews", { method: "POST", body: JSON.stringify(payload) });
      setReviews((current) => editing ? current.map((review) => review._id === result.data._id ? result.data : review) : [result.data, ...current]);
      setForm(emptyReview);
      setEditing(null);
      notify(editing ? "Review updated successfully." : "Review created successfully.");
    } catch (error) { notify(error.message, "error"); } finally { setSaving(false); }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    try {
      await api(`/reviews/${id}`, { method: "DELETE" });
      setReviews((current) => current.filter((review) => review._id !== id));
      notify("Review deleted.");
    } catch (error) { notify(error.message, "error"); }
  };

  const analyze = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true); setAiError(""); setAiResponse(null);
    try {
      const result = await api("/ai/analyze", { method: "POST", body: JSON.stringify({ reviewText: aiInput.trim() }) });
      setAiResponse(result.data);
    } catch (error) { setAiError(error.message); } finally { setAiLoading(false); }
  };

  const startEdit = (review) => { setEditing(review); setForm({ title: review.title, description: review.description, badge: review.badge, author: review.author || "" }); };
  const formFields = (
    <>
      <Input label="Title" required value={form.title} onChange={(e) => updateForm("title", e.target.value)} placeholder="e.g. Wonderful weekend stay" />
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">Review text<textarea required rows="4" value={form.description} onChange={(e) => updateForm("description", e.target.value)} className="px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What did the guest say?" /></label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Input label="Guest name (optional)" value={form.author} onChange={(e) => updateForm("author", e.target.value)} placeholder="Anonymous Guest" /><label className="flex flex-col gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment<select value={form.badge} onChange={(e) => updateForm("badge", e.target.value)} className="px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"><option>Positive</option><option>Neutral</option><option>Negative</option></select></label></div>
    </>
  );

  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main className="flex-grow p-4 sm:p-6 max-w-6xl mx-auto w-full sm:mt-6">
      <div className="mb-6"><p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">YOUR WORKSPACE</p><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Review management dashboard</h1><p className="text-gray-600 dark:text-gray-400 mt-1">Create, analyze, and respond to feedback in one place.</p></div>
      <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700" aria-labelledby="ai-heading"><h2 id="ai-heading" className="text-xl font-semibold dark:text-white">AI sentiment & response generator</h2><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Paste a guest review for an instant sentiment label and manager reply.</p><textarea aria-label="Review to analyze" className="w-full mt-4 p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Paste a guest review here…" value={aiInput} onChange={(e) => setAiInput(e.target.value)} /><div className="mt-3 flex items-center gap-3"><Button onClick={analyze} disabled={aiLoading || !aiInput.trim()}>{aiLoading ? "Analyzing review…" : "Analyze review"}</Button>{aiLoading && <Loader size="w-5 h-5" />}</div>{aiError && <p role="alert" className="text-red-600 text-sm mt-3">{aiError}</p>}{aiResponse && <div className="mt-4 p-4 bg-blue-50 dark:bg-gray-900 border dark:border-gray-600 rounded-md"><p className="font-semibold dark:text-white">Sentiment: <span className={`text-xs px-2 py-1 rounded-full ${badgeClasses[aiResponse.sentiment] || badgeClasses.Neutral}`}>{aiResponse.sentiment}</span></p><p className="text-gray-700 dark:text-gray-300 mt-3"><strong>Suggested reply:</strong> {aiResponse.draftedResponse?.text || aiResponse.draftedResponse}</p></div>}</section>
      <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700"><h2 className="text-xl font-semibold mb-4 dark:text-white">Add a review</h2><form onSubmit={saveReview} className="space-y-4">{formFields}<Button type="submit" disabled={saving}>{saving ? "Saving…" : "Create review"}</Button></form></section>
      <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border dark:border-gray-700"><div className="flex justify-between gap-3 items-center mb-4"><h2 className="text-xl font-semibold dark:text-white">Your reviews</h2><span className="text-sm text-gray-500">{reviews.length} total</span></div>{loading ? <div className="flex justify-center py-10"><Loader size="w-10 h-10" /></div> : reviews.length === 0 ? <div className="text-center border-2 border-dashed dark:border-gray-700 rounded-lg py-10 px-4"><h3 className="font-semibold dark:text-white">No reviews yet</h3><p className="text-gray-500 mt-1">Create your first review above to start managing feedback.</p></div> : <div className="space-y-3">{reviews.map((review) => <article key={review._id} className="p-4 border dark:border-gray-700 rounded-lg"><div className="flex flex-col sm:flex-row justify-between gap-3"><div><h3 className="font-bold dark:text-white">{review.title} <span className={`inline-block text-xs px-2 py-1 rounded-full align-middle ${badgeClasses[review.badge]}`}>{review.badge}</span></h3><p className="text-gray-600 dark:text-gray-300 mt-2">{review.description}</p><p className="text-xs text-gray-500 mt-2">Guest: {review.author || "Anonymous Guest"}</p></div><div className="flex gap-2 shrink-0"><Button variant="secondary" onClick={() => startEdit(review)}>Edit</Button><Button variant="danger" onClick={() => deleteReview(review._id)}>Delete</Button></div></div></article>)}</div>}</section>
    </main><Modal isOpen={!!editing} onClose={() => { setEditing(null); setForm(emptyReview); }} title="Edit review"><form onSubmit={saveReview} className="space-y-4">{formFields}<div className="flex justify-end gap-2"><Button variant="secondary" onClick={() => { setEditing(null); setForm(emptyReview); }}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button></div></form></Modal><Toast message={toast?.message} variant={toast?.variant} isVisible={!!toast} /><Footer />
  </div>;
}
