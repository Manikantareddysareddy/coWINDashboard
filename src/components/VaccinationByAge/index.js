import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {ageItem} = props
  return (
    <div className="age-main-container">
      <div className="age-container">
        <h1 className="age-heading">Vaccination by Age</h1>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                data={ageItem}
                startAngle={0}
                endAngle={360}
                innerRadius="0%"
                outerRadius="70%"
                dataKey="count"
              >
                <Cell name="18-44" fill=" #2d87bb" />
                <Cell name="44-60" fill="#a3df9f" />
                <Cell name="Above 60" fill="#64c2a6" />
              </Pie>
              <Legend
                iconType="circle"
                layout="horizontal"
                horizontalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
export default VaccinationByAge
