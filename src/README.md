### features:
- [x] players can place their ships manually
- [x] players can place their ships at random
- [ ] allow second player as computer
- [x] show/hide toggle for own ships
- [x] allow different sized boards option in the code
- [ ] make board size player selectable

### styling:
- [x] new game form
- [x] icons (ship, hit, miss, sunk) on gameboard
- [x] attack animation on gameboard
- [x] miss animation
- [ ] represent ships across multiple squares instead of individual spaces
- [ ] scoreboard
- [ ] hit animation
- [ ] sink animation
- [ ] gameover animation
- [ ] check on multiple screen sizes

### testing:
- [ ] placeShipsRandomly is not a pure function. need to mock for timeout/thrown error

### bugs:
- [ ] gameboard overflows on very small screens (385px)
- [ ] background doesn't extend to bottom in phone landscape mode
- [ ] rarely the pass animation plays twice and sends the board to the next player

### Keywords used in code:
- DEVTOOL
- NOTIMPLEMENTED
- BUG