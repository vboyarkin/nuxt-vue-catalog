export async function devTimeout() {
  if (process.env.NODE_ENV === 'development')
    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })
}
