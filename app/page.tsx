"use client";

import { useState, useMemo } from "react";

const modulesData = [
  { name: "Introduction to Philosophy", coef: 2, td: true, exam: true },
  { name: "Introduction to Psychology", coef: 2, td: true, exam: true },
  { name: "Introduction to Sociology", coef: 2, td: true, exam: true },
  { name: "Introduction to Anthropology", coef: 2, td: true, exam: true },
  { name: "Epistemology of the Social Sciences", coef: 2, td: true, exam: true },
  { name: "Descriptive Statistics", coef: 2, td: true, exam: true },
  { name: "History of Algeria 1", coef: 1, td: false, exam: true },
  { name: "Introduction to Open Source and Open Access", coef: 1, td: true, exam: true },
  { name: "Documentary Research 1", coef: 1, td: false, exam: true },
  { name: "Foreign Language 1", coef: 1, td: true, exam: false },
];

export default function Page() {
  const [marks, setMarks] = useState<any>({});

  const handleChange = (module: string, type: string, value: string) => {
    setMarks((prev: any) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [type]: value,
      },
    }));
  };

  const calculateModuleMark = (module: string) => {
    const data = modulesData.find((m) => m.name === module);
    const td = parseFloat(marks[module]?.td) || 0;
    const exam = parseFloat(marks[module]?.exam) || 0;

    if (!data) return 0;

    if (data.td && data.exam) return td * 0.4 + exam * 0.6;
    if (data.exam) return exam;
    if (data.td) return td;
    return 0;
  };

  const totalAverage = useMemo(() => {
    let total = 0;
    let coefSum = 0;

    modulesData.forEach((mod) => {
      const moduleMark = calculateModuleMark(mod.name);
      total += moduleMark * mod.coef;
      coefSum += mod.coef;
    });

    return coefSum ? (total / coefSum).toFixed(2) : "0";
  }, [marks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Social Sciences Mark Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {modulesData.map((module) => (
          <div key={module.name} className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <div>
              <h2 className="text-lg font-semibold">{module.name}</h2>
              <p className="text-sm text-gray-500">Coefficient: {module.coef}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {module.td && (
                <input
                  type="number"
                  min="0"
                  max="20"
                  placeholder="TD"
                  className="border p-2 rounded-lg"
                  onChange={(e) =>
                    handleChange(module.name, "td", e.target.value)
                  }
                />
              )}

              {module.exam && (
                <input
                  type="number"
                  min="0"
                  max="20"
                  placeholder="Exam"
                  className="border p-2 rounded-lg"
                  onChange={(e) =>
                    handleChange(module.name, "exam", e.target.value)
                  }
                />
              )}
            </div>

            <div className="text-right font-medium text-indigo-600">
              Module Mark: {calculateModuleMark(module.name).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-3xl font-bold text-purple-700">
        Final Average: {totalAverage} / 20
      </div>
    </div>
  );
}
