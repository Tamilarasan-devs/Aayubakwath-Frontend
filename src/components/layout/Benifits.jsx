import React from 'react'
import { PRODUCT_BENEFITS_DATA } from '../../data/productBenefitsData'

export default function Benifits() {
    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Product Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(PRODUCT_BENEFITS_DATA).map(([name, data]) => (
                    <div key={name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                            <img 
                                src={data.image} 
                                alt={name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-[var(--color-sage)]">{name}</h3>
                            <ul className="space-y-2">
                                {data.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-[var(--color-sage)] mt-1">✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
