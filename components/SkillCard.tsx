interface SkillCardProps {
  title: string
  level: number
  icon?: string
}

export default function SkillCard({ title, level, icon }: SkillCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon && <span className="text-2xl mr-3">{icon}</span>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{level}%</p>
    </div>
  )
}
