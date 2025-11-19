export default function ConfirmModal({ title, message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm animate-fadeIn">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
