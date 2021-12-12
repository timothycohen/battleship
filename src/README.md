### features:
- [x] players can place their ships manually
- [x] players can place their ships at random
- [x] allow second player as computer
- [x] show/hide toggle for own ships
- [x] allow different sized boards option in the code
- [ ] make board size player selectable
- [ ] hovering over suitable spots on the setup board should highlight them
- [ ] make the computer smarter than just choosing random unattacked squares

### styling:
- [x] new game form
- [x] icons (ship, hit, miss, sunk) on gameboard
- [x] attack animation on gameboard
- [x] miss view
- [x] hit animation
- [x] sink animation
- [x] gameover view
- [x] scoreboard
- [ ] check on multiple screen sizes
- [ ] represent ships across multiple squares instead of individual spaces
- [ ] sounds
- [ ] show last attack position

### testing:
- [ ] placeShipsRandomly is not a pure function. need to mock for timeout/thrown error

### bugs:
- [ ] gameboard overflows on very small screens (385px)
- [ ] background doesn't extend to bottom in phone landscape mode
- [ ] if the transition speed of the pass bomb animation is too fast (700ms), it plays twice and sends the board to the next player

### improvements:
- [ ] playerUp should be the actual player object not the index

### Keywords used in code:
- DEVTOOL
- NOTIMPLEMENTED
- BUG