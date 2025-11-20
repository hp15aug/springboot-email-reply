import { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Send, Reply } from "@mui/icons-material";
import axios from "axios";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === "string" ? response.data : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate reply. Please try again.");
      console.error("Error generating reply:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "grey.100",
        p: 3,
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: 700, color: "primary.main" }}
        >
          AI Email Reply Generator
        </Typography>

        {/* Split Layout */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            height: "85%",
          }}
        >
          {/* LEFT SIDE — INPUT */}
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center", fontWeight: 600 }}
            >
              <Reply sx={{ mr: 1 }} /> Original Email
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={20}
              variant="outlined"
              label="Paste Original Email Here…"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Tone + Button */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="tone-select-label">Reply Tone</InputLabel>
                <Select
                  labelId="tone-select-label"
                  value={tone}
                  label="Reply Tone"
                  onChange={(e) => setTone(e.target.value)}
                >
                  <MenuItem value="None">Default</MenuItem>
                  <MenuItem value="Formal">Formal</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="Friendly">Friendly</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={loading || !emailContent.trim()}
                onClick={handleSubmit}
                startIcon={
                  loading ? <CircularProgress size={20} color="inherit" /> : <Send />
                }
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </Box>

            {error && (
              <Typography
                color="error"
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "error.light",
                }}
              >
                <strong>Error:</strong> {error}
              </Typography>
            )}
          </Paper>

          {/* RIGHT SIDE — OUTPUT */}
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center", fontWeight: 600 }}
            >
              <Send sx={{ mr: 1 }} /> Generated Reply
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={20}
              variant="outlined"
              placeholder="Your generated email will appear here…"
              value={generatedReply}
              onChange={(e) => setGeneratedReply(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "grey.50",
                },
              }}
            />

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              disabled={!generatedReply}
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to Clipboard
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
