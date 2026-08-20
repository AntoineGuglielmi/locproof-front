export const checkEmailFeatureFlag = (varName: string): boolean => {
  return (
    !['development', 'test'].includes(process.env.NODE_ENV) ||
    process.env[varName] === 'true'
  )
}
