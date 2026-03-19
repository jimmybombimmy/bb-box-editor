const {
  BOX_RESIZE_BUFFER
} = process.env

export default {
  BOX_RESIZE_BUFFER: Number(BOX_RESIZE_BUFFER) || 50
}