function QuestionCard({

    question,

    current,

    total,

    selected,

    onSelect,

    onNext,

    onPrev,

    onSubmit,

}) {

    return (

        <div className="bg-white shadow-lg rounded-2xl p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Question {current + 1} / {total}

            </h2>

            <p className="text-xl mt-6">

                {question.question}

            </p>

            <div className="mt-8 space-y-4">

                {

                    question.options.map((option) => (

                        <label
                            key={option}
                            className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-100"
                        >

                            <input
                                type="radio"
                                checked={selected === option}
                                onChange={() => onSelect(option)}
                            />

                            {option}

                        </label>

                    ))

                }

            </div>

            <div className="flex justify-between mt-10">

                <button
                    onClick={onPrev}
                    disabled={current === 0}
                    className="bg-gray-400 text-white px-6 py-3 rounded-xl"
                >

                    Previous

                </button>

                {

                    current === total - 1 ?

                        (

                            <button
                                onClick={onSubmit}
                                className="bg-green-600 text-white px-8 py-3 rounded-xl"
                            >

                                Submit Quiz

                            </button>

                        )

                        :

                        (

                            <button
                                onClick={onNext}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                            >

                                Next

                            </button>

                        )

                }

            </div>

        </div>

    );

}

export default QuestionCard;