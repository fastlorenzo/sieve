/*
 * The content of this file is licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 */

import { SieveSession } from "./SieveSession.js";

/**
 * @inheritdoc
 */
class SieveNodeSession extends SieveSession {

  /**
   * @inheritdoc
   */
  async startTLS() {

    const options = {
      fingerprints: this.getOption("certFingerprints"),
      ignoreCertErrors: this.getOption("certIgnoreError")
    };

    await super.startTLS(options);
  }

  /**
   * The default error handler called upon any unhandled error or exception.
   * Called e.g. when the connection to the server was terminated unexpectedly.
   *
   * The default behaviour is to disconnect.
   *
   * @param {Error} error
   *   the error message which causes this exceptional state.
   */
  async onError(error) {

    this.getLogger().logSession(`OnError: ${error.message}`);

    await this.disconnect(true);
  }

}

export { SieveNodeSession as SieveSession };
