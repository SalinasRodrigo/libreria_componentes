/* eslint-disable react/prop-types */
import { useState } from "react"
import './PasswordStrengthChecker.css'


export const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState('')
  return (
    <>
      <h2>Password strength checker</h2>
      <InptPassword setPassword={setPassword} />
      <PasswordStrength password={password} />
      <RequirementsList password={password} />
    </>
  )
}

const InptPassword: React.FC<{ setPassword: (value: string) => void }> = ({ setPassword }) => {

  return (
    <input type="password" name="pass" id="pass" onChange={(e) => { setPassword(e.target.value) }} />
  )
}

const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const strength = evaluateStrength(password) || 'weak'
  return (
    <>
      <div className="exterior-bar">
        <div className={`internal-bar ${password.length > 0 && strength}`}>
        </div>
      </div>
      <small>{`${strength} password`}</small>
    </>
  )
}

const RequirementsList: React.FC<{ password: string }> = ({ password }) => {
  const requirements = [
    {
      label: 'Minimo 8 caracteres',
      pass: minimunLength(password)
    },
    {
      label: 'Numeros',
      pass: hasNumber(password)
    },
    {
      label: 'Caracter especial ($&+,:;=?@#|.^*()%!-)',
      pass: hasEspecial(password)
    },
    {
      label: 'Minusculas y mayusculas',
      pass: upperLowerCase(password)
    }
  ]
  return (
    <ul>
      {requirements.map( requirement => (
        <RequirementItem key={requirement.label} {...requirement}/>
      ))}
    </ul>
  )
}

interface requirement {
  label:string,
  pass: boolean
}
const RequirementItem:React.FC<requirement> = ({label, pass}) => {
  return(
    <li className={pass ? 'passed':'needed'}>{pass ? '✔' : '○'} {label}</li>
  )
}


type strength = 'weak' | 'mediun' | 'strong';

function evaluateStrength(password: string): strength {
  const tests = [
    minimunLength(password),
    hasNumber(password),
    hasEspecial(password),
    upperLowerCase(password)
  ]

  const passedTests = tests.filter(Boolean).length

  if (passedTests <= 1) return 'weak'
  if (passedTests <= 3) return 'mediun'
  return 'strong'
}



function minimunLength(password: string): boolean {
  return password.length >= 10
}

function hasNumber(password: string): boolean {
  return /\d/.test(password)
}

function hasEspecial(password: string): boolean {
  return /[^A-Za-z0-9]/.test(password)
}

function upperLowerCase(password: string): boolean {
  return /[A-Z]/.test(password) && /[a-z]/.test(password)
}

