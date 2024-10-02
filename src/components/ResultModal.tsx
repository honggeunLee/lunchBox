interface ResultModalProps {
    msg:string,
    callback:() => void,
}

function ResultModal({msg, callback}: ResultModalProps) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 transition-opacity duration-300">
            <div
                className="bg-white p-8 rounded-xl shadow-lg w-96 transform transition-transform duration-300 scale-105">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">알림</h2>
                <p className="mb-6 text-gray-600 text-center">{msg}</p>

                <div className="flex justify-center">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 ease-in-out shadow-md transform hover:scale-105"
                        onClick={() => callback()}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;