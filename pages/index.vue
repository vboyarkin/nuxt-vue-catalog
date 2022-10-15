<script>
export default {
  middleware: [
    function ({ redirect }) {
      redirect('/catalog')
    }
  ]
}
</script>
