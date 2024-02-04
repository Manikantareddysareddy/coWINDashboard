import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {genderItem} = props
  return (
    <div className="gender-main-container">
      <div className="gender-container">
        <h1 className="gender-heading">Vaccination by Gender</h1>
        <div className="piechart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                data={genderItem}
                startAngle={180}
                endAngle={0}
                innerRadius="40%"
                outerRadius="70%"
                dataKey="count"
              >
                <Cell name="Male" fill=" #f54394" />
                <Cell name="Female" fill="#5a8dee" />
                <Cell name="Others" fill="#2cc6c6" />
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
export default VaccinationByGender
